// @flow

import { type PlatformReducerAction } from './reducer';
import { type PlatformApiSagaAction } from './apiSaga';
import { type PlatformTaskSagaAction } from './taskSaga';

export type PlatformAction =
  | PlatformReducerAction
  | PlatformApiSagaAction
  | PlatformTaskSagaAction;

export * from './reducer';
export * from './apiSaga';
export * from './taskSaga';
