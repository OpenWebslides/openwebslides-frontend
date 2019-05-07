// @flow

import * as a from '../../actionTypes';

const setCurrentlySelectedInState = (
  id: ?string,
): a.SetCurrentlySelectedInStateAction => {
  return {
    type: a.SET_CURRENTLY_SELECTED_IN_STATE,
    payload: {
      id,
    },
  };
};

export default setCurrentlySelectedInState;
