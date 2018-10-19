// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const addToState = (loggedError: m.LoggedError): a.AddToStateAction => {
  return {
    type: a.ADD_TO_STATE,
    payload: {
      loggedError,
    },
  };
};

export default addToState;
