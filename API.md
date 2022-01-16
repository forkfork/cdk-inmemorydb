# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### MemoryDB <a name="cdk-redisdb.MemoryDB" id="cdkredisdbmemorydb"></a>

#### Initializers <a name="cdk-redisdb.MemoryDB.Initializer" id="cdkredisdbmemorydbinitializer"></a>

```typescript
import { MemoryDB } from 'cdk-redisdb'

new MemoryDB(scope: Construct, id: string, props?: RedisDBProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkredisdbmemorydbparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkredisdbmemorydbparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cdkredisdbmemorydbparameterprops) | [`cdk-redisdb.RedisDBProps`](#cdk-redisdb.RedisDBProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-redisdb.MemoryDB.parameter.scope" id="cdkredisdbmemorydbparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-redisdb.MemoryDB.parameter.id" id="cdkredisdbmemorydbparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-redisdb.MemoryDB.parameter.props" id="cdkredisdbmemorydbparameterprops"></a>

- *Type:* [`cdk-redisdb.RedisDBProps`](#cdk-redisdb.RedisDBProps)

---





### RedisDB <a name="cdk-redisdb.RedisDB" id="cdkredisdbredisdb"></a>

#### Initializers <a name="cdk-redisdb.RedisDB.Initializer" id="cdkredisdbredisdbinitializer"></a>

```typescript
import { RedisDB } from 'cdk-redisdb'

new RedisDB(scope: Construct, id: string, props?: RedisDBProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdkredisdbredisdbparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdkredisdbredisdbparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cdkredisdbredisdbparameterprops) | [`cdk-redisdb.RedisDBProps`](#cdk-redisdb.RedisDBProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-redisdb.RedisDB.parameter.scope" id="cdkredisdbredisdbparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-redisdb.RedisDB.parameter.id" id="cdkredisdbredisdbparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="cdk-redisdb.RedisDB.parameter.props" id="cdkredisdbredisdbparameterprops"></a>

- *Type:* [`cdk-redisdb.RedisDBProps`](#cdk-redisdb.RedisDBProps)

---





## Structs <a name="Structs" id="structs"></a>

### RedisDBProps <a name="cdk-redisdb.RedisDBProps" id="cdkredisdbredisdbprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { RedisDBProps } from 'cdk-redisdb'

const redisDBProps: RedisDBProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`analyticsReporting`](#cdkredisdbredisdbpropspropertyanalyticsreporting) | `boolean` | Include runtime versioning information in this Stack. |
| [`description`](#cdkredisdbredisdbpropspropertydescription) | `string` | A description of the stack. |
| [`env`](#cdkredisdbredisdbpropspropertyenv) | [`aws-cdk-lib.Environment`](#aws-cdk-lib.Environment) | The AWS environment (account/region) where this stack will be deployed. |
| [`stackName`](#cdkredisdbredisdbpropspropertystackname) | `string` | Name to deploy the stack with. |
| [`synthesizer`](#cdkredisdbredisdbpropspropertysynthesizer) | [`aws-cdk-lib.IStackSynthesizer`](#aws-cdk-lib.IStackSynthesizer) | Synthesis method to use while deploying this stack. |
| [`tags`](#cdkredisdbredisdbpropspropertytags) | {[ key: string ]: `string`} | Stack tags that will be applied to all the taggable resources and the stack itself. |
| [`terminationProtection`](#cdkredisdbredisdbpropspropertyterminationprotection) | `boolean` | Whether to enable termination protection for this stack. |
| [`atRestEncryptionEnabled`](#cdkredisdbredisdbpropspropertyatrestencryptionenabled) | `boolean` \| [`aws-cdk-lib.IResolvable`](#aws-cdk-lib.IResolvable) | *No description.* |
| [`engineVersion`](#cdkredisdbredisdbpropspropertyengineversion) | `string` | *No description.* |
| [`existingVpc`](#cdkredisdbredisdbpropspropertyexistingvpc) | [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc) | *No description.* |
| [`nodes`](#cdkredisdbredisdbpropspropertynodes) | `number` | *No description.* |
| [`nodeType`](#cdkredisdbredisdbpropspropertynodetype) | `string` | *No description.* |
| [`transitEncryptionEnabled`](#cdkredisdbredisdbpropspropertytransitencryptionenabled) | `boolean` \| [`aws-cdk-lib.IResolvable`](#aws-cdk-lib.IResolvable) | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.analyticsReporting" id="cdkredisdbredisdbpropspropertyanalyticsreporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* `boolean`
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `description`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.description" id="cdkredisdbredisdbpropspropertydescription"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.env" id="cdkredisdbredisdbpropspropertyenv"></a>

```typescript
public readonly env: Environment;
```

- *Type:* [`aws-cdk-lib.Environment`](#aws-cdk-lib.Environment)
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to select the indicated environment (recommended for production stacks), or to the values of environment variables `CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment depend on the AWS credentials/configuration that the CDK CLI is executed under (recommended for development stacks).  If the `Stack` is instantiated inside a `Stage`, any undefined `region`/`account` fields from `env` will default to the same field on the encompassing `Stage`, if configured there.  If either `region` or `account` are not set nor inherited from `Stage`, the Stack will be considered "*environment-agnostic*"". Environment-agnostic stacks can be deployed to any environment but may not be able to take advantage of all features of the CDK. For example, they will not be able to use environmental context lookups such as `ec2.Vpc.fromLookup` and will not automatically translate Service Principals to the right format based on the environment's AWS partition, and other such enhancements.

---

##### `stackName`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.stackName" id="cdkredisdbredisdbpropspropertystackname"></a>

```typescript
public readonly stackName: string;
```

- *Type:* `string`
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.synthesizer" id="cdkredisdbredisdbpropspropertysynthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* [`aws-cdk-lib.IStackSynthesizer`](#aws-cdk-lib.IStackSynthesizer)
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.tags" id="cdkredisdbredisdbpropspropertytags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.terminationProtection" id="cdkredisdbredisdbpropspropertyterminationprotection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* `boolean`
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `atRestEncryptionEnabled`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.atRestEncryptionEnabled" id="cdkredisdbredisdbpropspropertyatrestencryptionenabled"></a>

```typescript
public readonly atRestEncryptionEnabled: boolean | IResolvable;
```

- *Type:* `boolean` | [`aws-cdk-lib.IResolvable`](#aws-cdk-lib.IResolvable)

---

##### `engineVersion`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.engineVersion" id="cdkredisdbredisdbpropspropertyengineversion"></a>

```typescript
public readonly engineVersion: string;
```

- *Type:* `string`

---

##### `existingVpc`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.existingVpc" id="cdkredisdbredisdbpropspropertyexistingvpc"></a>

```typescript
public readonly existingVpc: IVpc;
```

- *Type:* [`aws-cdk-lib.aws_ec2.IVpc`](#aws-cdk-lib.aws_ec2.IVpc)

---

##### `nodes`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.nodes" id="cdkredisdbredisdbpropspropertynodes"></a>

```typescript
public readonly nodes: number;
```

- *Type:* `number`

---

##### `nodeType`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.nodeType" id="cdkredisdbredisdbpropspropertynodetype"></a>

```typescript
public readonly nodeType: string;
```

- *Type:* `string`

---

##### `transitEncryptionEnabled`<sup>Optional</sup> <a name="cdk-redisdb.RedisDBProps.property.transitEncryptionEnabled" id="cdkredisdbredisdbpropspropertytransitencryptionenabled"></a>

```typescript
public readonly transitEncryptionEnabled: boolean | IResolvable;
```

- *Type:* `boolean` | [`aws-cdk-lib.IResolvable`](#aws-cdk-lib.IResolvable)

---



