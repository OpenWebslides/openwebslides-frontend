// @flow

import { put, select } from 'redux-saga/effects';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { remove, toggleEditing } from '../../actions';
import selectors from '../../selectors';
import find from '../../lib/find';

const removeAndTogglePreviousItemSaga = function* (
  action: t.RemoveAndTogglePreviousItemAction,
): Generator<*, *, *> {
  const contentItemsById = yield select(selectors.getAllById);
  const { id } = action.payload;

  const contentItemToRemove = yield select(selectors.getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Find the previousEditorItem, if it exists. Do this before removing the contentItem.
  const previousEditorItem = find.previousEditorItem(contentItemToRemove, contentItemsById);

  // Remove the contentItem.
  yield put(remove(id));

  // Move the cursor to the previousEditorItem.
  if (previousEditorItem != null) {
    yield put(toggleEditing(previousEditorItem.id, true));
  }
};

export default removeAndTogglePreviousItemSaga;
