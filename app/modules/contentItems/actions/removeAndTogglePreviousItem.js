// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

const removeAndTogglePreviousItem = (id: Identifier): t.RemoveAndTogglePreviousItemAction => {
  return {
    type: t.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
    payload: {
      id,
    },
  };
};

export default removeAndTogglePreviousItem;
