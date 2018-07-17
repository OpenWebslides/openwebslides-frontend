// @flow

import { InvalidArgumentError } from 'errors';

import * as t from '../actionTypes';
import * as m from '../model';

// Reducer actions
const setStatusInState = (
  requestId: string,
  requestStatus: m.RequestStatus,
): t.SetStatusInStateAction => {
  if (requestId === '') {
    throw new InvalidArgumentError(`requestId cannot be empty`);
  }

  return {
    type: t.SET_STATUS_IN_STATE,
    payload: {
      requestId,
      requestStatus,
    },
  };
};

export default setStatusInState;
