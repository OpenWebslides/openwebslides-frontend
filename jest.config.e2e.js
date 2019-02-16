// @flow

module.exports = {
  // Run globalSetup before all tests and globalTeardown after; starts up the dev server.
  globalSetup: '<rootDir>/jest/e2e/globalSetup.js',
  globalTeardown: '<rootDir>/jest/e2e/globalTeardown.js',
  // Path to the jest setup script.
  setupFilesAfterEnv: [
    '<rootDir>/jest/e2e/setupTests.js',
  ],
  // Only run tests in the /e2e/ folder.
  testMatch: [
    '<rootDir>/e2e/**/*.test.js',
  ],
};
