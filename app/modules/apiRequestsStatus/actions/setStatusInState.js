// @flow

import { InvalidArgumentError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

// Reducer actions
const setStatusInState = (
  requestId: string,
  requestStatus: m.RequestStatus,
): a.SetStatusInStateAction => {
  if (requestId === '') {
    throw new InvalidArgumentError(`requestId cannot be empty`);
  }

  return {
    type: a.SET_STATUS_IN_STATE,
    payload: {
      requestId,
      requestStatus,
    },
  };
};

export default setStatusInState;
