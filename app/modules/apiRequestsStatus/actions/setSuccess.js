// @flow

import * as a from '../actionTypes';

const setSuccess = (requestId: string, value: mixed): a.SetSuccessAction => {
  return {
    type: a.SET_SUCCESS,
    payload: {
      requestId,
      value: (value !== undefined) ? value : null,
    },
  };
};

export default setSuccess;
