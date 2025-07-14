import { run } from './cli';

run().catch((err: any) => {
  console.error(err);
  process.exitCode = 1;
});
