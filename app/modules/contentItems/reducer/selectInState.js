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
      newContentItem = lib.find.parentOrSuperItem(currentContentItem, state.byId);
      break;
    case m.selectionTypes.CHILD:
      newContentItem = lib.find.allChildOrSubItems(currentContentItem, state.byId)[0];
      break;
    case m.selectionTypes.NEXT:
      newContentItem = lib.find.nextSiblingItem(currentContentItem, state.byId);
      break;
    case m.selectionTypes.PREVIOUS:
      newContentItem = lib.find.previousSiblingItem(currentContentItem, state.byId);
      break;
    default:
      return state;
  }

  return (newContentItem == null ? state : { ...state, currentlySelectedId: newContentItem.id });
};

export default selectInState;
