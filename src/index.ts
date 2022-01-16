import {
  aws_elasticache as elasticache,
  aws_memorydb as memorydb,
  aws_ec2 as ec2,
  //aws_applicationautoscaling as appscaling,
  StackProps,
  IResolvable,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface RedisDBProps extends StackProps {
  readonly existingVpc?: ec2.IVpc;
  readonly atRestEncryptionEnabled?: boolean | IResolvable;
  readonly transitEncryptionEnabled?: boolean | IResolvable;
  readonly engineVersion?: string;
  //readonly memoryAutoscalingTarget?: number;
  readonly nodes?: number;
}

function setupVpc(parent: any, props: RedisDBProps) : ec2.IVpc {
  return props.existingVpc ?? new ec2.Vpc(parent, 'Vpc', {
    subnetConfiguration: [
      {
        cidrMask: 24,
        name: 'Public Subnet',
        subnetType: ec2.SubnetType.PUBLIC,
      },
      {
        cidrMask: 24,
        name: 'Isolated Subnet',
        subnetType: ec2.SubnetType.ISOLATED,
      },
    ],
  });
}

export class RedisDB extends Construct {
  constructor(scope: Construct, id: string, props: RedisDBProps = {}) {
    super(scope, id);

    let isolatedSubnets: string[] = [];
    let redisVpc = setupVpc(this, props);
    redisVpc.isolatedSubnets.forEach(function(value) {
      isolatedSubnets.push(value.subnetId);
    });
    const ecSecurityGroup = new ec2.SecurityGroup(this, id + '-RedisDB-SG', {
      vpc: redisVpc,
      description: 'SecurityGroup associated with RedisDB Cluster ' + id,
      allowAllOutbound: false,
    });
    const ecSubnetGroup = new elasticache.CfnSubnetGroup(this, id + '-RedisDB-SubnetGroup', {
      description: 'RedisDB Subnet Group',
      subnetIds: isolatedSubnets,
      cacheSubnetGroupName: 'RedisDBSubnetGroup',
    });
    let elasticacheReplicationGroupName = id + '-RedisDB';
    let redis_cluster = new elasticache.CfnReplicationGroup(this, elasticacheReplicationGroupName, {
      numNodeGroups: props.nodes || 1,
      cacheNodeType: 'cache.m6g.large',
      engine: 'Redis',
      multiAzEnabled: false,
      autoMinorVersionUpgrade: false,
      cacheParameterGroupName: 'default.redis6.x.cluster.on',
      engineVersion: props.engineVersion ?? '6.x',
      cacheSubnetGroupName: ecSubnetGroup.cacheSubnetGroupName,
      securityGroupIds: [ecSecurityGroup.securityGroupId],
      replicationGroupDescription: 'RedisDB setup by CDK',
      atRestEncryptionEnabled: props.atRestEncryptionEnabled,
      transitEncryptionEnabled: props.transitEncryptionEnabled,
      replicasPerNodeGroup: 0,
    });
    redis_cluster.node.addDependency(ecSubnetGroup);
    /*
    if (typeof props.memoryAutoscalingTarget == 'number') {
      const target = new appscaling.ScalableTarget(this, 'ScalableTarget', {
        serviceNamespace: appscaling.ServiceNamespace.ELASTICACHE,
        resourceId: 'replication-group/' + redis_cluster.ref,
        scalableDimension: 'elasticache:replication-group:NodeGroups',
        maxCapacity: props.nodes||1 *3,
        minCapacity: props.nodes||1,
      });
      target.scaleToTrackMetric('MemTracking', {
        targetValue: props.memoryAutoscalingTarget,
        predefinedMetric: appscaling.PredefinedMetric.ELASTICACHE_DATABASE_MEMORY_USAGE_COUNTED_FOR_EVICT_PERCENTAGE,
      });
    }
    */
  }
}

export class MemoryDB extends Construct {
  constructor(scope: Construct, id: string, props: RedisDBProps = {}) {
    super(scope, id);
    let isolatedSubnets: string[] = [];
    let redisVpc = setupVpc(this, props);
    redisVpc.isolatedSubnets.forEach(function(value) {
      isolatedSubnets.push(value.subnetId);
    });
    const ecSecurityGroup = new ec2.SecurityGroup(this, id + '-RedisDB-SG', {
      vpc: redisVpc,
      description: 'SecurityGroup associated with RedisDB Cluster ' + id,
      allowAllOutbound: false,
    });
    const ecSubnetGroup = new memorydb.CfnSubnetGroup(this, id + '-RedisDB-SubnetGroup', {
      description: 'RedisDB Subnet Group',
      subnetIds: isolatedSubnets,
      subnetGroupName: 'memorydbsubnetgroup',
    });

    /*
    const cfnUser = new memorydb.CfnUser(this, 'memorydb-user', {
      accessString: 'on ~* +@all',
      authenticationMode: {"Passwords":["*****hunter2*****"],"Type":"password"},
      userName: 'admin',
    });
    const cfnACL = new memorydb.CfnACL(this, 'memorydb-acl', {
      aclName: 'myacl',
      userNames: ['admin'],
    });
    */
    const memorydb_cluster = new memorydb.CfnCluster(this, 'memorydb', {
      aclName: 'open-access',
      clusterName: 'clustername',
      nodeType: 'db.t4g.small',

      autoMinorVersionUpgrade: false,
      description: 'description',
      engineVersion: props.engineVersion ?? '6.2',
      numReplicasPerShard: 0,
      numShards: props.nodes||1,
      securityGroupIds: [ecSecurityGroup.securityGroupId],
      subnetGroupName: ecSubnetGroup.subnetGroupName,
      tlsEnabled: true,
    });
    memorydb_cluster.node.addDependency(ecSubnetGroup);
    //memorydb_cluster.node.addDependency(cfnACL);
    //cfnACL.node.addDependency(cfnUser);
  }
}
