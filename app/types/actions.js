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

export type AsyncRequestData = {|
  id: string,
  log: boolean,
  replay: boolean,
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
  asyncRequestData?: AsyncRequestData,
|};

export type TaskSagaAction = {|
  ...Action,
  payload: SagaActionPayload,
  asyncRequestData?: AsyncRequestData,
|};

export type SagaAction =
  | ApiSagaAction
  | TaskSagaAction;
