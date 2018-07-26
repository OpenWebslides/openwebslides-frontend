// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';
import find from '../lib/find';
import edit from '../lib/edit';

const removeChildrenAndSubItemsFromState = (
  state: m.ContentItemsState,
  contentItem: m.ContentItem,
): m.ContentItemsState => {
  let newState: m.ContentItemsState = {
    ...state,
  };

  if (_.includes(m.subableContentItemTypes, contentItem.type)) {
    ((contentItem: any): m.SubableContentItem).subItemIds.forEach(
      (subItemId: string): void => {
        const subItem = state.byId[subItemId];
        if (subItem == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
        newState = {
          ...newState,
          byId: _.omit(newState.byId, subItem.id),
        };
        newState = removeChildrenAndSubItemsFromState(newState, subItem);
      },
    );
  }

  if (_.includes(m.containerContentItemTypes, contentItem.type)) {
    ((contentItem: any): m.ContainerContentItem).childItemIds.forEach(
      (childItemId: string): void => {
        const childItem = state.byId[childItemId];
        if (childItem == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
        newState = {
          ...newState,
          byId: _.omit(newState.byId, childItem.id),
        };
        newState = removeChildrenAndSubItemsFromState(newState, childItem);
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
  const context = find.extendedVerticalContext(contentItemToRemove, state.byId);

  // Remove it from the byId object
  newState = {
    ...newState,
    byId: _.omit(newState.byId, contentItemToRemove.id),
  };

  // Remove its nested subItems and/or childItems from the byId object
  newState = removeChildrenAndSubItemsFromState(newState, contentItemToRemove);

  // Update the removed contentItem's context, if there is one
  if (context == null) {
    if (contentItemToRemove.type !== m.contentItemTypes.ROOT) {
      throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find parentOrSuperItem for a non-ROOT contentItem.`);
    }
  }
  else {
    const editedParentOrSuperItem = edit.removeChildOrSubItemIdFromContext(
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
