// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const API_GET_ALL: 'feedItems/API_GET_ALL' = 'feedItems/API_GET_ALL';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAllAction = {|
  type: typeof API_GET_ALL,
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type FeedItemsApiSagaAction =
  | ApiGetAllAction;
