import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RedisDB, MemoryDB } from '../src/main';

test('Snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'test');
  new RedisDB(stack, 'test', {});
  new MemoryDB(stack, 'test2', {});

  const template = Template.fromStack(stack);
  app.synth();
  expect(template.toJSON()).toMatchSnapshot();
});
