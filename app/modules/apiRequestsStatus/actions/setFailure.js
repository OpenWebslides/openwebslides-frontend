// @flow

import * as a from '../actionTypes';

const setFailure = (requestId: string, error: Error): a.SetFailureAction => {
  return {
    type: a.SET_FAILURE,
    payload: {
      requestId,
      error,
    },
  };
};

export default setFailure;
