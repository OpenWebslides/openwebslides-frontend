// @flow

import * as t from '../actionTypes';

const setFailure = (requestId: string, error: Error): t.SetFailureAction => {
  return {
    type: t.SET_FAILURE,
    payload: {
      requestId,
      error,
    },
  };
};

export default setFailure;
