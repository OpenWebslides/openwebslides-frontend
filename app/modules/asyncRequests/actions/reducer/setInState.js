// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

// Reducer actions
const setInState = (asyncRequest: m.AsyncRequest): a.SetInStateAction => {
  return {
    type: a.SET_IN_STATE,
    payload: {
      asyncRequest,
    },
  };
};

export default setInState;
