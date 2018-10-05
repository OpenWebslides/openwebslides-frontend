// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const removeAndTogglePreviousItem = function* (
  action: a.RemoveAndTogglePreviousItemAction,
): Saga<void> {
  const contentItemsById = yield select(selectors.getAllById);
  const { id } = action.payload;

  const contentItemToRemove = yield select(selectors.getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Find the previousEditorItem, if it exists. Do this before removing the contentItem.
  const previousEditorItem = lib.find.previousEditorItem(contentItemToRemove, contentItemsById);

  // Remove the contentItem.
  yield call(putAndReturn, actions.remove(id));

  // Move the cursor to the previousEditorItem.
  if (previousEditorItem != null) {
    yield call(putAndReturn, actions.toggleEditing(previousEditorItem.id, true));
  }
};

export default removeAndTogglePreviousItem;
