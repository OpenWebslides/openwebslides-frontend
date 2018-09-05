// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const FETCH_ALL: 'feedItems/FETCH_ALL' = 'feedItems/FETCH_ALL';


// Action types ------------------------------------------------------------------------------------

export type FetchAllAction = {|
  type: typeof FETCH_ALL,
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type TaskSagaAction =
  | FetchAllAction;
