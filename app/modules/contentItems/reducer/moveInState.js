// @flow

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import * as m from '../model';
import find from '../lib/find';
import edit from '../lib/edit';

const moveInState = (
  state: m.ContentItemsState,
  action: t.MoveInStateAction,
): m.ContentItemsState => {
  const { id, nextContext } = action.payload;

  const contentItemToMove = state.byId[id];
  if (contentItemToMove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  if (contentItemToMove.type === m.contentItemTypes.ROOT) throw new UnsupportedOperationError(`Can't move a ROOT.`);

  const previousContext = find.extendedVerticalContext(contentItemToMove, state.byId);
  if (previousContext == null) throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find parentOrSuperItem for a non-ROOT contentItem.`);

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
    const editedPreviousParentOrSuperItem = edit.removeChildOrSubItemIdFromContext(
      previousContext,
      contentItemToMove.id,
      state.byId,
    );
    const editedNextParentOrSuperItem = edit.addChildOrSubItemIdToContext(
      nextContext,
      contentItemToMove.id,
      state.byId,
    );

    const newState = {
      ...state,
      byId: {
        ...state.byId,
        [editedPreviousParentOrSuperItem.id]: editedPreviousParentOrSuperItem,
        [editedNextParentOrSuperItem.id]: editedNextParentOrSuperItem,
      },
    };

    try {
      edit.validateChildOrSubItemsInContext(nextContext, newState.byId);
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
