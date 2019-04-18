// @flow

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';
import lib from '../lib';

const setCurrentlySelectedInState = (
  state: m.ContentItemsState,
  action: a.SetCurrentlySelectedInStateAction,
): m.ContentItemsState => {
  let newSelectedId: ?string;

  if (action.payload.id == null) {
    newSelectedId = null;
  }
  else {
    const contentItem: m.ContentItem = state.byId[action.payload.id];

    if (contentItem == null) throw new ObjectNotFoundError('contentItems:contentItem', action.payload.id);

    if (contentItem.type === m.contentItemTypes.ROOT) {
      const subItems = lib.find.allSubItems(contentItem, state.byId);

      newSelectedId = (subItems.length > 0 ? subItems[0].id : null);
    }
    else newSelectedId = contentItem.id;
  }

  if (state.currentlySelectedId === newSelectedId) return state;

  return {
    ...state,
    currentlySelectedId: newSelectedId,
  };
};

export default setCurrentlySelectedInState;
