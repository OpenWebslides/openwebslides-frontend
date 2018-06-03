// @flow

import _ from 'lodash';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import type {
  ContentItemsState,
} from '../model';

const switchEditingInState = (
  state: ContentItemsState,
  action: t.SwitchEditingInStateAction,
): ContentItemsState => {
  const { previousEditingItemId, nextEditingItemId } = action.payload;
  let newState: ContentItemsState = { ...state };

  if (previousEditingItemId != null) {
    const previousEditingItem = state.byId[previousEditingItemId];
    if (previousEditingItem == null) throw new ObjectNotFoundError('contentItems:contentItem', previousEditingItemId);
    if (!previousEditingItem.isEditing) throw new UnsupportedOperationError(`Attempted to deactivate an item that was already deactivated.`);

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [previousEditingItem.id]: {
          ...previousEditingItem,
          isEditing: false,
        },
      },
    };
  }

  if (nextEditingItemId != null) {
    const nextEditingItem = state.byId[nextEditingItemId];
    if (nextEditingItem == null) throw new ObjectNotFoundError('contentItems:contentItem', nextEditingItemId);
    if (nextEditingItem.isEditing) throw new UnsupportedOperationError(`Attempted to activate an item that was already active.`);

    newState = {
      ...newState,
      byId: {
        ...newState.byId,
        [nextEditingItem.id]: {
          ...nextEditingItem,
          isEditing: true,
        },
      },
    };
  }

  return (_.isEqual(state, newState)) ? state : newState;
};

export default switchEditingInState;
