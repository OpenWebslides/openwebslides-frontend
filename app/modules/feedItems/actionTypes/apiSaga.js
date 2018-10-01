// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ApiSagaAction } from 'types/actions';


// Action constants --------------------------------------------------------------------------------

export const API_GET_ALL: 'feedItems/API_GET_ALL' = 'feedItems/API_GET_ALL';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAllAction = {|
  ...ApiSagaAction,
  type: typeof API_GET_ALL,
  payload: {|
    ...$PropertyType<ApiSagaAction, 'payload'>,
  |},
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type FeedItemsApiSagaAction =
  | ApiGetAllAction;
