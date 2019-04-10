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

  switch (action.payload.selection) {
    case m.selectionTypes.PARENT:
      // Select parent of current contentItem
      newContentItem = lib.find.superItem(currentContentItem, state.byId);
      break;
    case m.selectionTypes.CHILD:
      // Select first child of current contentItem
      newContentItem = lib.find.allSubItems(currentContentItem, state.byId)[0];
      break;
    case m.selectionTypes.NEXT:
      // Select next sibling of current contentItem
      newContentItem = lib.find.nextSiblingItem(currentContentItem, state.byId);

      // Or next item in editor order if there are no more siblings
      if (newContentItem == null) {
        newContentItem = lib.find.nextEditorItem(currentContentItem, state.byId);
      }

      break;
    case m.selectionTypes.PREVIOUS:
      // Select previous sibling of current contentItem
      newContentItem = lib.find.previousSiblingItem(currentContentItem, state.byId);

      // Or previous item in editor order if there are no more siblings
      if (newContentItem == null) {
        newContentItem = lib.find.previousEditorItem(currentContentItem, state.byId);
      }
      break;
    default:
      return state;
  }

  return (newContentItem == null ? state : { ...state, currentlySelectedId: newContentItem.id });
};

export default selectInState;
