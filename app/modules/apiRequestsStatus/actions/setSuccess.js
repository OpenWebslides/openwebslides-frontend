// @flow

import * as t from '../actionTypes';

const setSuccess = (requestId: string, value: mixed): t.SetSuccessAction => {
  return {
    type: t.SET_SUCCESS,
    payload: {
      requestId,
      value: (value !== undefined) ? value : null,
    },
  };
};

export default setSuccess;
