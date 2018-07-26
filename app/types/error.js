// @flow

export type ErrorAction = {|
  type: string,
  error: Error,
  // TRUE if the error has a custom handler and mustn't be processed by the default error handler.
  +customHandler?: true,
|};
