// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setMultipleInState = (users: $ReadOnlyArray<m.User>): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      users,
    },
  };
};

export default setMultipleInState;
