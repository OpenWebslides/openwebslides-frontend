// @flow

module.exports = {
  // Only collect coverage for the files in the /app folder.
  collectCoverageFrom: [
    'app/**/*.js',
  ],
  // Ignore these paths / files when collecting coverage.
  coveragePathIgnorePatterns: [
    'node_modules',
    '.eslintrc.js',
    'app/index.js',
    'app/config/*',
    'app/lib/testResources/*',
  ],
  // Use the app folder as an additional root for imports, to match webpack's resolve.modules.
  moduleDirectories: [
    'node_modules',
    'app',
  ],
  // Mock these file types so their imports do not cause errors.
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|flow)$': '<rootDir>/jest/unit/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/jest/unit/mocks/styleMock.js',
  },
  // Setup files for mock modules.
  setupFiles: [
    'jest-date-mock',
    'jest-localstorage-mock',
  ],
  // Path to the jest setup script.
  setupTestFrameworkScriptFile: '<rootDir>/jest/unit/setupTests.js',
  // Only run tests in the /app/ folder.
  testMatch: [
    '<rootDir>/app/**/*.test.js',
  ],
};
