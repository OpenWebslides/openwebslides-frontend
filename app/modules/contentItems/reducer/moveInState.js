// @flow

import {
  CorruptedInternalStateError,
  ObjectNotFoundError,
  UnsupportedOperationError,
} from 'errors';

import * as a from '../actionTypes';
import lib from '../lib';
import * as m from '../model';

const moveInState = (
  state: m.ContentItemsState,
  action: a.MoveInStateAction,
): m.ContentItemsState => {
  const { id, nextContext } = action.payload;

  const contentItemToMove = state.byId[id];
  if (contentItemToMove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  if (contentItemToMove.type === m.contentItemTypes.ROOT) throw new UnsupportedOperationError(`Can't move a ROOT.`);

  const previousContext = lib.find.extendedSuperContext(contentItemToMove, state.byId);
  if (previousContext == null) throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find superItem for a non-ROOT contentItem.`);

  // If the previousContext is the same as the nextContext
  if (
    previousContext.contextType === nextContext.contextType
    && previousContext.contextItemId === nextContext.contextItemId
    && previousContext.indexInSiblingItems === (nextContext.indexInSiblingItems || 0)
  ) {
    // Return the state object unchanged.
    return state;
  }
  // If the move is meaningful
  else {
    const editedPreviousSuperItem = lib.edit.removeSubItemIdFromContext(
      previousContext,
      contentItemToMove.id,
      state.byId,
    );
    const editedNextSuperItem = lib.edit.addSubItemIdToContext(
      nextContext,
      contentItemToMove.id,
      state.byId,
    );

    const newState = {
      ...state,
      byId: {
        ...state.byId,
        [editedPreviousSuperItem.id]: editedPreviousSuperItem,
        [editedNextSuperItem.id]: editedNextSuperItem,
      },
    };

    try {
      lib.edit.validateSubItemsInContext(nextContext, newState.byId);
    }
    catch (e) {
      if (e instanceof CorruptedInternalStateError) {
        throw new UnsupportedOperationError(e.message);
      }
      else {
        throw e;
      }
    }

    return newState;
  }
};

export default moveInState;
