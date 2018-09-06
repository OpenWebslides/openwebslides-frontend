// @flow

import * as a from '../../actionTypes';

const setFailure = (id: string, error: Error): a.SetFailureAction => {
  return {
    type: a.SET_FAILURE,
    payload: {
      id,
      error,
    },
  };
};

export default setFailure;
