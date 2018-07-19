// @flow
/* eslint-disable no-multiple-empty-lines */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_STATUS_IN_STATE: 'apiRequestsStatus/SET_STATUS_IN_STATE' = 'apiRequestsStatus/SET_STATUS_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetStatusInStateAction = {
  type: typeof SET_STATUS_IN_STATE,
  payload: {
    requestId: string,
    requestStatus: m.RequestStatus,
  },
};


// Reducer action ----------------------------------------------------------------------------------

export type ReducerAction =
  | SetStatusInStateAction;
