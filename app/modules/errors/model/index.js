// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// LoggedError -------------------------------------------------------------------------------------

export type LoggedError = {|
  errorObject: Error,
  timestamp: number,
|};


// Module state ------------------------------------------------------------------------------------

export type ErrorsState = {|
  log: $ReadOnlyArray<LoggedError>,
|};
