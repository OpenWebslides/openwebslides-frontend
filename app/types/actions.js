// @flow

/**
 * Base flow types for different types of actions;
 * use these to define properties that should be common to all actions.
 * Note: all actions need to consistently extend these for this system to work.
 */

type ActionPayload = {||};

type ReducerActionPayload = {|
  ...ActionPayload,
|};

type SagaActionPayload = {|
  ...ActionPayload,
|};

export type Action = {|
  type: string,
  payload: ActionPayload,
|};

export type ReducerAction = {|
  ...Action,
  payload: ReducerActionPayload,
|};

export type ApiSagaAction = {|
  ...Action,
  payload: SagaActionPayload,
|};

export type TaskSagaAction = {|
  ...Action,
  payload: SagaActionPayload,
|};

export type SagaAction =
  | ApiSagaAction
  | TaskSagaAction;
