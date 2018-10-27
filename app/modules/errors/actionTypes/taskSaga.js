// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const LOG: 'errors/LOG' = 'errors/LOG';


// Action types ------------------------------------------------------------------------------------

export type LogAction = {|
  ...TaskSagaAction,
  type: typeof LOG,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    errorObject: Error,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type ErrorsTaskSagaAction =
  | LogAction;

