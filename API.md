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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MemoryDB <a name="MemoryDB" id="cdk-redisdb.MemoryDB"></a>

#### Initializers <a name="Initializers" id="cdk-redisdb.MemoryDB.Initializer"></a>

```typescript
import { MemoryDB } from 'cdk-redisdb'

new MemoryDB(scope: Construct, id: string, props?: RedisDBProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-redisdb.MemoryDB.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-redisdb.MemoryDB.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.MemoryDB.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-redisdb.RedisDBProps">RedisDBProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-redisdb.MemoryDB.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-redisdb.MemoryDB.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-redisdb.MemoryDB.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-redisdb.RedisDBProps">RedisDBProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-redisdb.MemoryDB.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-redisdb.MemoryDB.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-redisdb.MemoryDB.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-redisdb.MemoryDB.isConstruct"></a>

```typescript
import { MemoryDB } from 'cdk-redisdb'

MemoryDB.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-redisdb.MemoryDB.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-redisdb.MemoryDB.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-redisdb.MemoryDB.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_memorydb.CfnCluster</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-redisdb.MemoryDB.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="cdk-redisdb.MemoryDB.property.cluster"></a>

```typescript
public readonly cluster: CfnCluster;
```

- *Type:* aws-cdk-lib.aws_memorydb.CfnCluster

---


### RedisDB <a name="RedisDB" id="cdk-redisdb.RedisDB"></a>

#### Initializers <a name="Initializers" id="cdk-redisdb.RedisDB.Initializer"></a>

```typescript
import { RedisDB } from 'cdk-redisdb'

new RedisDB(scope: Construct, id: string, props?: RedisDBProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-redisdb.RedisDB.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDB.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDB.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-redisdb.RedisDBProps">RedisDBProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-redisdb.RedisDB.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-redisdb.RedisDB.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-redisdb.RedisDB.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-redisdb.RedisDBProps">RedisDBProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-redisdb.RedisDB.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-redisdb.RedisDB.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-redisdb.RedisDB.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-redisdb.RedisDB.isConstruct"></a>

```typescript
import { RedisDB } from 'cdk-redisdb'

RedisDB.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-redisdb.RedisDB.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-redisdb.RedisDB.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-redisdb.RedisDB.property.replicationGroup">replicationGroup</a></code> | <code>aws-cdk-lib.aws_elasticache.CfnReplicationGroup</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-redisdb.RedisDB.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `replicationGroup`<sup>Required</sup> <a name="replicationGroup" id="cdk-redisdb.RedisDB.property.replicationGroup"></a>

```typescript
public readonly replicationGroup: CfnReplicationGroup;
```

- *Type:* aws-cdk-lib.aws_elasticache.CfnReplicationGroup

---


## Structs <a name="Structs" id="Structs"></a>

### RedisDBProps <a name="RedisDBProps" id="cdk-redisdb.RedisDBProps"></a>

#### Initializer <a name="Initializer" id="cdk-redisdb.RedisDBProps.Initializer"></a>

```typescript
import { RedisDBProps } from 'cdk-redisdb'

const redisDBProps: RedisDBProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-redisdb.RedisDBProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#cdk-redisdb.RedisDBProps.property.atRestEncryptionEnabled">atRestEncryptionEnabled</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.authToken">authToken</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.engineVersion">engineVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.existingSecurityGroup">existingSecurityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.existingSubnetGroupName">existingSubnetGroupName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.existingVpc">existingVpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.memoryAutoscalingTarget">memoryAutoscalingTarget</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.nodes">nodes</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.nodesCpuAutoscalingTarget">nodesCpuAutoscalingTarget</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.nodeType">nodeType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.parameterGroupName">parameterGroupName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.replicas">replicas</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.replicasCpuAutoscalingTarget">replicasCpuAutoscalingTarget</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.subnetGroupName">subnetGroupName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-redisdb.RedisDBProps.property.transitEncryptionEnabled">transitEncryptionEnabled</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="cdk-redisdb.RedisDBProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="cdk-redisdb.RedisDBProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-redisdb.RedisDBProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="cdk-redisdb.RedisDBProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="cdk-redisdb.RedisDBProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="cdk-redisdb.RedisDBProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="cdk-redisdb.RedisDBProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="cdk-redisdb.RedisDBProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="cdk-redisdb.RedisDBProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `atRestEncryptionEnabled`<sup>Optional</sup> <a name="atRestEncryptionEnabled" id="cdk-redisdb.RedisDBProps.property.atRestEncryptionEnabled"></a>

```typescript
public readonly atRestEncryptionEnabled: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

---

##### `authToken`<sup>Optional</sup> <a name="authToken" id="cdk-redisdb.RedisDBProps.property.authToken"></a>

```typescript
public readonly authToken: string;
```

- *Type:* string

---

##### `engineVersion`<sup>Optional</sup> <a name="engineVersion" id="cdk-redisdb.RedisDBProps.property.engineVersion"></a>

```typescript
public readonly engineVersion: string;
```

- *Type:* string

---

##### `existingSecurityGroup`<sup>Optional</sup> <a name="existingSecurityGroup" id="cdk-redisdb.RedisDBProps.property.existingSecurityGroup"></a>

```typescript
public readonly existingSecurityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

---

##### `existingSubnetGroupName`<sup>Optional</sup> <a name="existingSubnetGroupName" id="cdk-redisdb.RedisDBProps.property.existingSubnetGroupName"></a>

```typescript
public readonly existingSubnetGroupName: string;
```

- *Type:* string

---

##### `existingVpc`<sup>Optional</sup> <a name="existingVpc" id="cdk-redisdb.RedisDBProps.property.existingVpc"></a>

```typescript
public readonly existingVpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `memoryAutoscalingTarget`<sup>Optional</sup> <a name="memoryAutoscalingTarget" id="cdk-redisdb.RedisDBProps.property.memoryAutoscalingTarget"></a>

```typescript
public readonly memoryAutoscalingTarget: number;
```

- *Type:* number

---

##### `nodes`<sup>Optional</sup> <a name="nodes" id="cdk-redisdb.RedisDBProps.property.nodes"></a>

```typescript
public readonly nodes: number;
```

- *Type:* number

---

##### `nodesCpuAutoscalingTarget`<sup>Optional</sup> <a name="nodesCpuAutoscalingTarget" id="cdk-redisdb.RedisDBProps.property.nodesCpuAutoscalingTarget"></a>

```typescript
public readonly nodesCpuAutoscalingTarget: number;
```

- *Type:* number

---

##### `nodeType`<sup>Optional</sup> <a name="nodeType" id="cdk-redisdb.RedisDBProps.property.nodeType"></a>

```typescript
public readonly nodeType: string;
```

- *Type:* string

---

##### `parameterGroupName`<sup>Optional</sup> <a name="parameterGroupName" id="cdk-redisdb.RedisDBProps.property.parameterGroupName"></a>

```typescript
public readonly parameterGroupName: string;
```

- *Type:* string

---

##### `replicas`<sup>Optional</sup> <a name="replicas" id="cdk-redisdb.RedisDBProps.property.replicas"></a>

```typescript
public readonly replicas: number;
```

- *Type:* number

---

##### `replicasCpuAutoscalingTarget`<sup>Optional</sup> <a name="replicasCpuAutoscalingTarget" id="cdk-redisdb.RedisDBProps.property.replicasCpuAutoscalingTarget"></a>

```typescript
public readonly replicasCpuAutoscalingTarget: number;
```

- *Type:* number

---

##### `subnetGroupName`<sup>Optional</sup> <a name="subnetGroupName" id="cdk-redisdb.RedisDBProps.property.subnetGroupName"></a>

```typescript
public readonly subnetGroupName: string;
```

- *Type:* string

---

##### `transitEncryptionEnabled`<sup>Optional</sup> <a name="transitEncryptionEnabled" id="cdk-redisdb.RedisDBProps.property.transitEncryptionEnabled"></a>

```typescript
public readonly transitEncryptionEnabled: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

---



