// @flow

import * as a from '../actionTypes';

const removeFromState = (
  id: string,
): a.RemoveFromStateAction => {
  return {
    type: a.REMOVE_FROM_STATE,
    payload: {
      id,
    },
  };
};

export default removeFromState;
