// @flow

import * as t from '../actionTypes';

const removeFromState = (
  id: string,
): t.RemoveFromStateAction => {
  return {
    type: t.REMOVE_FROM_STATE,
    payload: {
      id,
    },
  };
};

export default removeFromState;
