# cdk-redisdb

An AWS CDK construct which spins up an Elasticache Replication Group, or a MemoryDB Cluster. 


## Usage (TypeScript/JavaScript)

Install via npm:

```shell
$ npm i cdk-redisdb
```

Add an Elasticache Replication Group to your CDK stack:

```ts
import { RedisDB } from 'cdk-redisdb'

new RedisDB(this, 'redisdb-repl-group', {
  nodes: 1,
  nodeType: 'cache.m6g.large',
  engineVersion: '6.2',
})
```

Add a MemoryDB Cluster to your CDK stack:

```ts
import { MemoryDB } from 'cdk-redisdb'

new MemoryDB(this, 'memorydb-repl-group', {
  nodes: 1,
  nodeType: 'db.t4g.small',
  engineVersion: '6.2',
})
```

Specify a VPC rather than having a VPC auto-created for you:

```ts
import { MemoryDB } from 'cdk-redisdb'

let vpc = new ec2.Vpc(this, 'Vpc', {
  subnetConfiguration: [
    {
      cidrMask: 24,
      name: 'public1',
      subnetType: ec2.SubnetType.PUBLIC,
    },
    {
      cidrMask: 24,
      name: 'isolated1',
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    },
  ],
})

new RedisDB(this, 'redis-use-existing-vpc', {
  existingVpc: vpc,
})
```

Add 2 replicas per node, and add shards to cluster when memory exceeds 60%.

```ts
import { RedisDB } from 'cdk-redisdb'

new RedisDB(this, 'redisdb-repl-group', {
  nodes: 1,
  replicas: 2, // 2 replicas per node
  nodeType: 'cache.m6g.large',
  memoryAutoscalingTarget: 60,
  // nodesCpuAutoscalingTarget
})
```

```ts
import { RedisDB } from 'cdk-redisdb'

let vpc = new ec2.Vpc(this, 'Vpc', {
  subnetConfiguration: [
    {
      cidrMask: 24,
      name: 'public1',
      subnetType: ec2.SubnetType.PUBLIC,
    },
    {
      cidrMask: 24,
      name: 'isolated1',
      subnetType: ec2.SubnetType.PRIVATE,
    },
  ],
})

const ecSecurityGroup = new ec2.SecurityGroup(this, 'elasticache-sg', {
  vpc: vpc,
  description: 'SecurityGroup associated with the ElastiCache Redis Cluster',
  allowAllOutbound: false,
});

new RedisDB(this, 'redisdb-repl-group', {
  nodes: 1,
  nodeType: 'cache.m6g.large',
  nodesCpuAutoscalingTarget: 50,
  existingVpc: vpc,
  existingSecurityGroup: ecSecurityGroup,
})
```

Features in progress:

* MemoryDB ACLs (commented out to avoid default bad practices, read comments to understand the CloudFormation)

Features to come:

* Replication Groups with cluster mode disabled (for those using multiple databases)
* Improved API - sane choice of props
