// @flow

import * as a from '../../actionTypes';

const setSuccess = (id: string, value: mixed): a.SetSuccessAction => {
  return {
    type: a.SET_SUCCESS,
    payload: {
      id,
      value: (value != null) ? value : null,
    },
  };
};

export default setSuccess;
