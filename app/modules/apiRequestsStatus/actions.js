// @flow

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';

import * as t from './actionTypes';
import type { StatusType } from './model';

// Reducer actions
export const setStatusInState = (
  request: string,
  status: StatusType,
  error?: Error,
): t.SetStatusInStateAction => {
  const newRequest = _.trim(request);

  if (newRequest === '') {
    throw new InvalidArgumentError(`Request cannot be empty`);
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
