// @flow

/* eslint-disable flowtype/no-weak-types */
import * as a from '../actionTypes';
import * as m from '../model';
import lib from '../lib';

const selectInState = (
  state: m.ContentItemsState,
  action: a.SelectInStateAction,
): m.ContentItemsState => {
  if (state.currentlySelectedId == null) return state;

  const currentContentItem: m.ContentItem = state.byId[state.currentlySelectedId];

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

  return (newContentItem == null ? state : { ...state, currentlySelectedId: newContentItem.id });
};

export default selectInState;
