// @flow

import _ from 'lodash';

import * as t from './actionTypes';

import type { StatusType } from './model';

// Reducer actions
export const setStatusInState = (
  request: string,
  status: StatusType,
  error?: Error,
): t.SetStatusInStateAction | t.SetStatusInStateErrorAction => {
  const newRequest = _.trim(request);

  if (newRequest === '') {
    return {
      type: t.SET_STATUS_IN_STATE_ERROR,
      error: {
        message: 'Request cannot be empty.',
      },
    };
  }

  return {
    type: t.SET_STATUS_IN_STATE,
    payload: {
      request,
      status,
      error,
    },
  };
};
