// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';

import * as a from '../../actionTypes';
import actions from '../../actions';
import selectors from '../../selectors';
import find from '../../lib/find';

const removeAndTogglePreviousItemSaga = function* (
  action: a.RemoveAndTogglePreviousItemAction,
): Saga<void> {
  const contentItemsById = yield select(selectors.getAllById);
  const { id } = action.payload;

  const contentItemToRemove = yield select(selectors.getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Find the previousEditorItem, if it exists. Do this before removing the contentItem.
  const previousEditorItem = find.previousEditorItem(contentItemToRemove, contentItemsById);

  // Remove the contentItem.
  yield put(actions.remove(id));

  // Move the cursor to the previousEditorItem.
  if (previousEditorItem != null) {
    yield put(actions.toggleEditing(previousEditorItem.id, true));
  }
};

export default removeAndTogglePreviousItemSaga;
