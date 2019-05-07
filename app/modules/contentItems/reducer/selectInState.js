// @flow

/* eslint-disable flowtype/no-weak-types */

import { CorruptedInternalStateError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';
import lib from '../lib';

const selectInState = (
  state: m.ContentItemsState,
  action: a.SelectInStateAction,
): m.ContentItemsState => {
  if (state.currentlySelectedId == null) return state;

  const currentContentItem: m.ContentItem = state.byId[state.currentlySelectedId];

  if (currentContentItem == null) throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find contentItem for currentlySelectedId`);

  let newContentItem: ?m.ContentItem;

  if (action.payload.selection === m.selectionTypes.SUPER) {
    // Select super contentItem of current contentItem
    newContentItem = lib.find.superItem(currentContentItem, state.byId);
  }
  else if (action.payload.selection === m.selectionTypes.SUB) {
    // Select first sub contentItem of current contentItem
    newContentItem = lib.find.allSubItems(currentContentItem, state.byId)[0];
  }
  else if (action.payload.selection === m.selectionTypes.NEXT) {
    // Select next sibling contentItem of current contentItem
    newContentItem = lib.find.nextSiblingItem(currentContentItem, state.byId);

    // Or next contentItem in editor order if there are no more siblings
    if (newContentItem == null) {
      newContentItem = lib.find.nextEditorItem(currentContentItem, state.byId);
    }
  }
  else if (action.payload.selection === m.selectionTypes.PREVIOUS) {
    // Select previous sibling of current contentItem
    newContentItem = lib.find.previousSiblingItem(currentContentItem, state.byId);

    // Or previous item in editor order if there are no more siblings
    if (newContentItem == null) {
      newContentItem = lib.find.previousEditorItem(currentContentItem, state.byId);
    }
  }

  // Prevent selecting the ROOT content item, select the first subItem instead
  if (newContentItem != null && newContentItem.type === m.contentItemTypes.ROOT) {
    const subItems = lib.find.allSubItems(newContentItem, state.byId);

    newContentItem = (subItems.length > 0 ? subItems[0] : null);
  }

  if (newContentItem == null || newContentItem.id === state.currentlySelectedId) {
    return state;
  }
  else return { ...state, currentlySelectedId: newContentItem.id };
};

export default selectInState;
