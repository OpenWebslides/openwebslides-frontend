// @flow

import * as a from '../../actionTypes';

const setDirtyInState = (
  id: string,
  dirty: boolean,
): a.SetDirtyInStateAction => {
  return {
    type: a.SET_DIRTY_IN_STATE,
    payload: {
      id,
      dirty,
    },
  };
};

export default setDirtyInState;
