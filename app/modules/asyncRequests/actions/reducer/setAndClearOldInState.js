// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setAndClearOldInState = (asyncRequest: m.AsyncRequest): a.SetAndClearOldInStateAction => {
  return {
    type: a.SET_AND_CLEAR_OLD_IN_STATE,
    payload: {
      asyncRequest,
    },
  };
};

export default setAndClearOldInState;
