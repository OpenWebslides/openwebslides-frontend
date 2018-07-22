// @flow

import * as t from '../actionTypes';

const removeAndTogglePreviousItem = (id: string): t.RemoveAndTogglePreviousItemAction => {
  return {
    type: t.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
    payload: {
      id,
    },
  };
};

export default removeAndTogglePreviousItem;
