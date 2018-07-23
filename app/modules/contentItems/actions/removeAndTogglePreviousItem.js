// @flow

import * as a from '../actionTypes';

const removeAndTogglePreviousItem = (id: string): a.RemoveAndTogglePreviousItemAction => {
  return {
    type: a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
    payload: {
      id,
    },
  };
};

export default removeAndTogglePreviousItem;
