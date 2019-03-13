// @flow

/* eslint-disable */

import { teardown as teardownDevServer } from 'jest-dev-server';

const globalTeardown = async (): Promise<void> => {
  await teardownDevServer();
  // Your global teardown
};

export default globalTeardown;
