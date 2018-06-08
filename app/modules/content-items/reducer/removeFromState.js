// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import {
  contentItemTypes,
  subableContentItemTypes,
  containerContentItemTypes,
  contextTypes,
} from '../model';
import type {
  ContentItem,
  SubableContentItem,
  ContainerContentItem,
  ContentItemsState,
} from '../model';

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
  const { id, context } = action.payload;
  let newState: ContentItemsState = {
    ...state,
  };

  // Get the contentItem to remove
  const contentItemToRemove = state.byId[id];
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

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
      throw new InvalidArgumentError(`Adding a new contentItem of a type other than ROOT requires a context to be defined.`);
    }
  }
  else {
    const contextItem = state.byId[context.contextItemId];
    if (contextItem == null) {
      throw new ObjectNotFoundError('contentItems:contentItem', context.contextItemId);
    }

    let contextItemToEdit: any = { ...contextItem };

    if (context.contextType === contextTypes.SUPER) {
      if (!_.includes(subableContentItemTypes, contextItemToEdit.type)) {
        throw new InvalidArgumentError(`Can't remove a sub item from a contentItem that is not subable.`);
      }
      if (!_.includes(contextItemToEdit.subItemIds, contentItemToRemove.id)) {
        throw new InvalidArgumentError(`No such subItem found.`);
      }

      contextItemToEdit = {
        ...contextItemToEdit,
        subItemIds: _.without(contextItemToEdit.subItemIds, contentItemToRemove.id),
      };
    }
    else if (context.contextType === contextTypes.PARENT) {
      if (!_.includes(containerContentItemTypes, contextItemToEdit.type)) {
        throw new InvalidArgumentError(`Can't remove a child item from a contentItem that is not a container.`);
      }
      if (!_.includes(contextItemToEdit.childItemIds, contentItemToRemove.id)) {
        throw new InvalidArgumentError(`No such childItem found.`);
      }

      contextItemToEdit = {
        ...contextItemToEdit,
        childItemIds: _.without(contextItemToEdit.childItemIds, contentItemToRemove.id),
      };
    }
    else {
      throw new InvalidArgumentError(`Invalid contextType.`);
    }

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [contextItemToEdit.id]: contextItemToEdit,
      },
    };
  }

  return newState;
};

export default removeFromState;
