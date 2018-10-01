// @flow

/* eslint-disable flowtype/no-weak-types */

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const removeSaga = function* (action: a.RemoveAction): Saga<void> {
  const { id } = action.payload;

  const contentItemToRemove = yield select(selectors.getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // If the contentItemToRemove is a HEADING
  if (contentItemToRemove.type === m.contentItemTypes.HEADING) {
    const contentItemsById = yield select(selectors.getAllById);
    const previousSiblingItem = lib.find.previousSiblingItem(contentItemToRemove, contentItemsById);
    let moveContext: m.VerticalContext;

    // Move its subItems to either the end of the previous HEADING, if there is one
    if (previousSiblingItem != null && previousSiblingItem.type === m.contentItemTypes.HEADING) {
      const subItemsCount = ((previousSiblingItem: any): m.HeadingContentItem).subItemIds.length;

      moveContext = {
        contextType: m.contextTypes.SUPER,
        contextItemId: previousSiblingItem.id,
        indexInSiblingItems: subItemsCount,
      };
    }
    // Or, if there is no previous HEADING, to the location where the removed HEADING used to be
    else {
      const context = lib.find.extendedVerticalContext(contentItemToRemove, contentItemsById);
      if (context == null) throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find parentOrSuperItem for a non-ROOT contentItem.`);

      moveContext = context;
    }

    // Do this in reverse so we can use the same moveContext every time.
    for (let i: number = contentItemToRemove.subItemIds.length - 1; i >= 0; i -= 1) {
      yield put(actions.move(
        contentItemToRemove.subItemIds[i],
        moveContext,
      ));
    }
  }

  // Remove the contentItem
  yield put(actions.removeFromState(id));
};

export default removeSaga;
