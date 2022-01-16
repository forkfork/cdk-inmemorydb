const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Timothy Downs',
  authorAddress: 'timothydowns@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-redisdb',
  repositoryUrl: 'https://github.com/timothydowns/cdk-redisdb.git',

  deps: [], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: 'cdk-redisdb', /* The "name" in package.json. */
});
project.synth();
