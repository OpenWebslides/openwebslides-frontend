// @flow

import * as t from '../actionTypes';
import type { ContentItem, ContentItemsById, ContentItemsState } from '../model';

const setMultipleInState = (
  state: ContentItemsState,
  action: t.SetMultipleInStateAction,
): ContentItemsState => {
  const contentItemsById: ContentItemsById = action.payload.contentItems.reduce(
    (map: ContentItemsById, contentItem: ContentItem): ContentItemsById => {
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
