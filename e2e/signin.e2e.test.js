// @flow

import Nightmare from 'nightmare';

import config from './config';

let nightmare: typeof Nightmare;

beforeEach(async (): Promise<mixed> => {
  nightmare = new Nightmare(config.nightmareOptions);
  await nightmare.goto(config.baseUrl);
});

afterEach(async (): Promise<mixed> => {
  await nightmare.end();
});

test(`A pre-existing user can sign in and is redirected to their profile.`, async (): Promise<mixed> => {
  // Verify that there is no currently signed in user (i.e. the auth menu is displayed).
  await nightmare.wait('[data-test-id="auth-menu"]');

  // Verify that the user was redirected to the signin page.
  await nightmare.wait('[data-test-id="signin-card"]');

  // Fill out the sign in form and click the submit button.
  await nightmare.type('[data-test-id="signin-card"] [data-test-id="email-field"] input', config.signin.email);
  await nightmare.type('[data-test-id="signin-card"] [data-test-id="password-field"] input', config.signin.password);
  await nightmare.click('[data-test-id="signin-card"] [data-test-id="submit-button"]');

  // Verify that there is a currently signed in user (i.e. the user account menu is displayed).
  await nightmare.wait('[data-test-id="user-account-menu"]');

  // Verify that the user was redirected to their profile page.
  await nightmare.wait('[data-test-id="current-user-profile"]');
});
