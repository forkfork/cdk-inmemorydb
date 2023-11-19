import {
  IResolvable,
  StackProps,
  aws_applicationautoscaling as appscaling,
  aws_ec2 as ec2,
  aws_elasticache as elasticache,
  aws_memorydb as memorydb,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface RedisDBProps extends StackProps {
  readonly existingVpc?: ec2.IVpc;
  readonly existingSecurityGroup?: ec2.ISecurityGroup;
  readonly existingSubnetGroupName?: string;
  readonly atRestEncryptionEnabled?: boolean | IResolvable;
  readonly transitEncryptionEnabled?: boolean | IResolvable;
  readonly engineVersion?: string;
  readonly parameterGroupName?: string;
  readonly memoryAutoscalingTarget?: number;
  readonly replicasCpuAutoscalingTarget?: number;
  readonly nodesCpuAutoscalingTarget?: number;
  readonly nodes?: number;
  readonly nodeType?: string;
  readonly replicas?: number;
  readonly authToken?: string;
  readonly subnetGroupName?: string;
  readonly elasticacheReplicationGroupId?: string;
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
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
    ],
  });
}

export class RedisDB extends Construct {
  public readonly replicationGroup : elasticache.CfnReplicationGroup;
  public readonly vpc : ec2.IVpc;
  constructor(scope: Construct, id: string, props: RedisDBProps = {}) {
    super(scope, id);

    let isolatedSubnets: string[] = [];
    let redisVpc = setupVpc(this, props);
    this.vpc = redisVpc;
    redisVpc.isolatedSubnets.forEach(function(value) {
      isolatedSubnets.push(value.subnetId);
    });
    if (isolatedSubnets.length == 0) {
      redisVpc.privateSubnets.forEach(function(value) {
        isolatedSubnets.push(value.subnetId);
      });
    }
    if (isolatedSubnets.length == 0) {
      redisVpc.publicSubnets.forEach(function(value) {
        isolatedSubnets.push(value.subnetId);
      });
    }
    const ecSecurityGroup = props.existingSecurityGroup ?? new ec2.SecurityGroup(this, id + '-RedisDB-SG', {
      vpc: redisVpc,
      description: 'SecurityGroup associated with RedisDB Cluster ' + id,
      allowAllOutbound: false,
    });
    let groupName: string;
    let ecSubnetGroup: elasticache.CfnSubnetGroup;
    if (!props.existingSubnetGroupName) {
      ecSubnetGroup = new elasticache.CfnSubnetGroup(this, id + '-RedisDB-SubnetGroup', {
        description: 'RedisDB Subnet Group',
        subnetIds: isolatedSubnets,
        cacheSubnetGroupName: props.subnetGroupName || 'RedisDBSubnetGroup',
      });
      groupName = ecSubnetGroup.cacheSubnetGroupName!;
    } else {
      groupName = props.existingSubnetGroupName!;
    }

    let elasticacheReplicationGroupName = id + '-RedisDB';
    let redis_cluster = new elasticache.CfnReplicationGroup(this, elasticacheReplicationGroupName, {
      numNodeGroups: props.nodes || 1,
      cacheNodeType: props.nodeType || 'cache.m6g.large',
      engine: 'Redis',
      multiAzEnabled: false,
      autoMinorVersionUpgrade: false,
      cacheParameterGroupName: props.parameterGroupName ?? 'default.redis7.cluster.on',
      engineVersion: props.engineVersion ?? '7.0',
      cacheSubnetGroupName: groupName,
      securityGroupIds: [ecSecurityGroup.securityGroupId],
      replicationGroupDescription: 'RedisDB setup by CDK',
      atRestEncryptionEnabled: props.atRestEncryptionEnabled,
      transitEncryptionEnabled: props.transitEncryptionEnabled,
      replicasPerNodeGroup: props.replicas || 0,
      authToken: props.authToken,
      globalReplicationGroupId: props.elasticacheReplicationGroupId,
    });
    this.replicationGroup = redis_cluster;
    if (!props.existingSubnetGroupName) {
      redis_cluster.node.addDependency(ecSubnetGroup!);
    }
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
    } else if (typeof props.replicasCpuAutoscalingTarget == 'number') {
      const target = new appscaling.ScalableTarget(this, 'ScalableTarget', {
        serviceNamespace: appscaling.ServiceNamespace.ELASTICACHE,
        resourceId: 'replication-group/' + redis_cluster.ref,
        scalableDimension: 'elasticache:replication-group:group:Replicas',
        maxCapacity: props.nodes||1 *3,
        minCapacity: props.nodes||1,
      });
      target.scaleToTrackMetric('CpuTracking', {
        targetValue: props.replicasCpuAutoscalingTarget,
        predefinedMetric: appscaling.PredefinedMetric.ELASTICACHE_PRIMARY_ENGINE_CPU_UTILIZATION,
      });
    } else if (typeof props.nodesCpuAutoscalingTarget == 'number') {
      const target = new appscaling.ScalableTarget(this, 'ScalableTarget', {
        serviceNamespace: appscaling.ServiceNamespace.ELASTICACHE,
        resourceId: 'replication-group/' + redis_cluster.ref,
        scalableDimension: 'elasticache:replication-group:NodeGroups',
        maxCapacity: props.nodes||1 *3,
        minCapacity: props.nodes||1,
      });
      target.scaleToTrackMetric('CpuTracking', {
        targetValue: props.nodesCpuAutoscalingTarget,
        predefinedMetric: appscaling.PredefinedMetric.ELASTICACHE_PRIMARY_ENGINE_CPU_UTILIZATION,
      });
    }
  }
}

export class MemoryDB extends Construct {
  public readonly cluster : memorydb.CfnCluster;
  public readonly vpc : ec2.IVpc;
  constructor(scope: Construct, id: string, props: RedisDBProps = {}) {
    super(scope, id);
    let isolatedSubnets: string[] = [];
    let redisVpc = setupVpc(this, props);
    this.vpc = redisVpc;
    redisVpc.isolatedSubnets.forEach(function(value) {
      isolatedSubnets.push(value.subnetId);
    });
    if (isolatedSubnets.length == 0) {
      redisVpc.privateSubnets.forEach(function(value) {
        isolatedSubnets.push(value.subnetId);
      });
    }
    if (isolatedSubnets.length == 0) {
      redisVpc.publicSubnets.forEach(function(value) {
        isolatedSubnets.push(value.subnetId);
      });
    }
    const ecSecurityGroup = props.existingSecurityGroup ?? new ec2.SecurityGroup(this, id + '-RedisDB-SG', {
      vpc: redisVpc,
      description: 'SecurityGroup associated with RedisDB Cluster ' + id,
      allowAllOutbound: false,
    });
    let groupName: string;
    let ecSubnetGroup: memorydb.CfnSubnetGroup;
    if (!props.existingSubnetGroupName) {
      ecSubnetGroup = new memorydb.CfnSubnetGroup(this, id + '-RedisDB-SubnetGroup', {
        description: 'RedisDB Subnet Group',
        subnetIds: isolatedSubnets,
        subnetGroupName: props.subnetGroupName || 'memorydbsubnetgroup',
      });
      groupName = ecSubnetGroup.subnetGroupName!;
    } else {
      groupName = props.existingSubnetGroupName!;
    }

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
      nodeType: props.nodeType || 'db.t4g.small',

      autoMinorVersionUpgrade: false,
      description: 'description',
      engineVersion: props.engineVersion ?? '7.0',
      numShards: props.nodes||1,
      numReplicasPerShard: props.replicas||0,
      securityGroupIds: [ecSecurityGroup.securityGroupId],
      subnetGroupName: groupName,
      tlsEnabled: true,
    });
    if (!props.existingSubnetGroupName) {
      memorydb_cluster.node.addDependency(ecSubnetGroup!);
    }
    this.cluster = memorydb_cluster;
    //memorydb_cluster.node.addDependency(cfnACL);
    //cfnACL.node.addDependency(cfnUser);
  }
}
