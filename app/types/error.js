// @flow

export type Error = {
  // The error message
  +message: string,
  // TRUE if the error has a custom handler and mustn't be processed by the default error handler.
  +customHandler?: true,
};

export type ErrorAction = {
  type: string,
  error: Error,
};
