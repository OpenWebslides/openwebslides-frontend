// @flow

module.exports = {
  // Print coverage report when running tests.
  // collectCoverage: true,
  // Only collect coverage for the files in the /app folder.
  collectCoverageFrom: [
    'app/**/*.js',
  ],
  // Use the app folder as an additional root for imports, to match webpack's resolve.modules.
  moduleDirectories: [
    'node_modules',
    'app',
  ],
  // Path to the jest setup script.
  setupTestFrameworkScriptFile: '<rootDir>/app/setupTests.js',
  // Output descriptions of individual tests, instead of just the names of the tested files.
  // verbose: true,
};
