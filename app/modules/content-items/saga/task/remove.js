// @flow
/* eslint-disable flowtype/no-weak-types */

import { put, select } from 'redux-saga/effects';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { removeFromState, move } from '../../actions';
import { contentItemTypes, contextTypes } from '../../model';
import type { HeadingContentItem, VerticalContext } from '../../model';
import { getById, getAllById } from '../../selectors';
import find from '../../lib/find';

const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const { id } = action.payload;

  const contentItemToRemove = yield select(getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // If the contentItemToRemove is a HEADING
  if (contentItemToRemove.type === contentItemTypes.HEADING) {
    const contentItemsById = yield select(getAllById);
    const previousSiblingItem = find.previousSiblingItem(contentItemToRemove, contentItemsById);
    let moveContext: VerticalContext;

    // Move its subItems to either the end of the previous HEADING, if there is one
    if (previousSiblingItem != null && previousSiblingItem.type === contentItemTypes.HEADING) {
      const subItemsCount = ((previousSiblingItem: any): HeadingContentItem).subItemIds.length;

      moveContext = {
        contextType: contextTypes.SUPER,
        contextItemId: previousSiblingItem.id,
        indexInSiblingItems: subItemsCount,
      };
    }
    // Or, if there is no previous HEADING, to the location where the removed HEADING used to be
    else {
      const context = find.extendedVerticalContext(contentItemToRemove, contentItemsById);
      if (context == null) throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find parentOrSuperItem for a non-ROOT contentItem.`);

      moveContext = context;
    }

    // Do this in reverse so we can use the same moveContext every time.
    for (let i: number = contentItemToRemove.subItemIds.length - 1; i >= 0; i -= 1) {
      yield put(move(
        contentItemToRemove.subItemIds[i],
        moveContext,
      ));
    }
  }

  // Remove the contentItem
  yield put(removeFromState(id));
};

export default removeSaga;
