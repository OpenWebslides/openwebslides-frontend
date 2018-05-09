// @flow

import _ from 'lodash';

import * as t from './actionTypes';

import type { StatusType } from './model';

// Reducer actions
export const setStatusInState = (
  request: string,
  status: StatusType,
  error?: Error,
): t.SetStatusAction | t.SetStatusErrorAction => {
  const newRequest = _.trim(request);

  if (newRequest === '') {
    return {
      type: t.SET_STATUS_ERROR,
      error: {
        message: 'Request cannot be empty.',
      },
    };
  }

  return {
    type: t.SET_STATUS,
    payload: {
      request,
      status,
      error,
    },
  };
};
