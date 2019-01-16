// @flow

/**
 * Simple smoke test.
 */

import Nightmare from 'nightmare';

import config from './config';

let nightmare: typeof Nightmare;

beforeEach(async (): Promise<void> => {
  nightmare = new Nightmare(config.nightmareOptions);
  await nightmare.on('console', config.nightmareConsoleHandler);
  await nightmare.on('page', config.nightmarePageHandler);
  await nightmare.goto(config.baseUrl, config.headers);
});

afterEach(async (): Promise<void> => {
  await nightmare.end();
});

test(`The app loads without error`, async (): Promise<void> => {
  await nightmare.wait('[data-test-id="page"]');
});
