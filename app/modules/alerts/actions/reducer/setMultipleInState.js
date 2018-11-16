// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setMultipleInState = (
  alerts: $ReadOnlyArray<m.Alert>,
): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      alerts,
    },
  };
};

export default setMultipleInState;
