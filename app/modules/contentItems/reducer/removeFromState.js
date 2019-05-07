// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import lib from '../lib';
import * as m from '../model';

const removeSubItemsFromState = (
  state: m.ContentItemsState,
  contentItem: m.ContentItem,
): m.ContentItemsState => {
  let newState: m.ContentItemsState = {
    ...state,
  };

  if (contentItem.subItemIds != null && contentItem.subItemIds.length > 0) {
    contentItem.subItemIds.forEach(
      (subItemId: string): void => {
        const subItem = state.byId[subItemId];
        if (subItem == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
        newState = {
          ...newState,
          byId: _.omit(newState.byId, subItem.id),
        };
        newState = removeSubItemsFromState(newState, subItem);
      },
    );
  }

  return newState;
};

const removeFromState = (
  state: m.ContentItemsState,
  action: a.RemoveFromStateAction,
): m.ContentItemsState => {
  const { id } = action.payload;
  let newState: m.ContentItemsState = {
    ...state,
  };

  // Get the contentItem to remove
  const contentItemToRemove = state.byId[id];
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Find its context
  const context = lib.find.extendedSuperContext(contentItemToRemove, state.byId);

  let newSelectedId: ?string;

  // If it was selected, select the previous contentItem in editor order
  if (state.currentlySelectedId === contentItemToRemove.id) {
    const previousContentItem = lib.find.previousEditorItem(contentItemToRemove, state.byId);

    newSelectedId = (previousContentItem != null ? previousContentItem.id : null);
  }
  else newSelectedId = state.currentlySelectedId;

  // Remove it from the byId object
  newState = {
    ...newState,
    byId: _.omit(newState.byId, contentItemToRemove.id),
    currentlySelectedId: newSelectedId,
  };

  // Remove its nested subItems from the byId object
  newState = removeSubItemsFromState(newState, contentItemToRemove);

  // Update the removed contentItem's context, if there is one
  if (context == null) {
    if (contentItemToRemove.type !== m.contentItemTypes.ROOT) {
      throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find parentOrSuperItem for a non-ROOT contentItem.`);
    }
  }
  else {
    const editedParentOrSuperItem = lib.edit.removeSubItemIdFromContext(
      context,
      contentItemToRemove.id,
      state.byId,
    );

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [editedParentOrSuperItem.id]: editedParentOrSuperItem,
      },
    };
  }

  return newState;
};

export default removeFromState;
