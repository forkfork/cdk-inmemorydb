const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Timothy Downs',
  authorAddress: 'timothydowns@gmail.com',
  cdkVersion: '2.8.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-redisdb',
  repositoryUrl: 'https://github.com/forkfork/cdk-redisdb.git',

  deps: [], /* Runtime dependencies of this module. */
  description: 'Simple & featureful Redis on AWS - Elasticache Replication Group & MemoryDB with a unified API',
  devDeps: [
    '@types/prettier@2.4.4',
  ], /* Build dependencies for this module. */
  packageName: 'cdk-redisdb', /* The "name" in package.json. */
  publishToPypi: {
    distName: 'cdk-redisdb',
    module: 'cdk_redisdb',
  },
});
project.synth();
