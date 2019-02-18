// @flow

// const consoleError = console.error;
// const consoleWarn = console.warn;

// $FlowFixMe intentional error override
console.error = (error: (Error | string), ...args: $ReadOnlyArray<mixed>): void => {
  // consoleError.apply(console, args); // keep default behaviour
  let errorMessage: string = (error instanceof Error) ? error.message : error;
  args.forEach((arg: string): void => {
    errorMessage = errorMessage.replace(/%(s|d|i|o|O)/, arg);
  });
  throw new Error(`Console error: ${errorMessage}`);
};
// $FlowFixMe intentional warn override
console.warn = (warning: string, ...args: $ReadOnlyArray<mixed>): void => {
  // consoleWarn.apply(console, args); // keep default behaviour
  let warningMessage: string = warning;
  args.forEach((arg: string): void => {
    warningMessage = warningMessage.replace(/%(s|d|i|o|O)/, arg);
  });
  throw new Error(`Console warning: ${warningMessage}`);
};
