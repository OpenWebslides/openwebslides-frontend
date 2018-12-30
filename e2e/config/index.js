// @flow

const consoleHandler = (type: string, ...args: $ReadOnlyArray<string>): void => {
  if (type === 'error') {
    console.error('BROWSER CONSOLE ERROR:', ...args);
  }
  else if (type === 'warn') {
    console.warn('BROWSER CONSOLE WARNING:', ...args);
  }
  else {
    // do nothing with console.log
  }
};

const pageHandler = (type: string, ...args: $ReadOnlyArray<string>): void => {
  if (type === 'error') console.error('PAGE ERROR:', ...args);
};

const config = {
  nightmareOptions: {
    waitTimeout: 5000,
  },
  nightmareConsoleHandler: consoleHandler,
  nightmarePageHandler: pageHandler,
  baseUrl: 'http://localhost:8080',
  headers: {},
  signin: {
    email: 'openwebslides.test@gmail.com',
    password: 'owstest',
  },
};

export default config;
