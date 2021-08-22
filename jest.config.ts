import {randomBytes} from 'crypto';

module.exports = async () => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    globalSetup: './src/test/setup.ts',
    globals: {
      __id: randomBytes(20).toString('hex'),
    },
  };
};
