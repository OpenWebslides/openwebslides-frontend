// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.ContentItemsState,
  action: a.SetMultipleInStateAction,
): m.ContentItemsState => {
  if (action.payload.contentItems.length === 0) {
    return state;
  }

  const contentItemsById: m.ContentItemsById = action.payload.contentItems.reduce(
    (map: m.ContentItemsById, contentItem: m.ContentItem): m.ContentItemsById => {
      return {
        ...map,
        [contentItem.id]: contentItem,
      };
    },
    {},
  );

  return {
    ...state,
    byId: {
      ...state.byId,
      ...contentItemsById,
    },
  };
};

export default setMultipleInState;
