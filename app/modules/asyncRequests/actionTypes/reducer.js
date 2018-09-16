// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_IN_STATE: 'asyncRequests/SET_STATUS_IN_STATE' = 'asyncRequests/SET_STATUS_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetInStateAction = {|
  type: typeof SET_IN_STATE,
  payload: {|
    asyncRequest: m.AsyncRequest,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type AsyncRequestsReducerAction =
  | SetInStateAction;
