// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import * as model from '../model';
import find from '../lib/find';
import edit from '../lib/edit';

const {
  contentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
  ContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsState,
} = model;

const removeChildrenAndSubItemsFromState = (
  state: ContentItemsState,
  contentItem: ContentItem,
): ContentItemsState => {
  let newState: ContentItemsState = {
    ...state,
  };

  if (_.includes(subableContentItemTypes, contentItem.type)) {
    ((contentItem: any): SubableContentItem).subItemIds.forEach(
      (subItemId: Identifier): void => {
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

  if (_.includes(containerContentItemTypes, contentItem.type)) {
    ((contentItem: any): ContainerContentItem).childItemIds.forEach(
      (childItemId: Identifier): void => {
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
  state: ContentItemsState,
  action: t.RemoveFromStateAction,
): ContentItemsState => {
  const { id } = action.payload;
  let newState: ContentItemsState = {
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
    if (contentItemToRemove.type !== contentItemTypes.ROOT) {
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
