# cdk-redisdb

An AWS CDK construct which spins up an Elasticache Replication Group, or a MemoryDB Cluster.

__SECURITY NOTE__: This construct is still in development, please carefully review the resources created before using this in production.

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
}
```

Add a MemoryDB Cluster to your CDK stack:

```ts
import { MemoryDB } from 'cdk-redisdb'

new MemoryDB(this, 'memorydb-repl-group', {
  nodes: 1,
  nodeType: 'db.t4g.small',
  engineVersion: '6.2',
}
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
      subnetType: ec2.SubnetType.ISOLATED,
    },
  ],
})

new RedisDB(this, 'redis-use-existing-vpc', {
  existingVpc: vpc,
})
```

Features in progress:

* Autoscaling (working locally, but struggling with JSII - commented out)
* MemoryDB ACLs (commented out to avoid default bad practices, read comments to understand the CloudFormation)

Features to come:

* Replication Groups with cluster mode disabled (for those using multiple databases)
* Improved API - sane choice of props
