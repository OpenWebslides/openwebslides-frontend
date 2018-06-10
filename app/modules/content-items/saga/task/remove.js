// @flow

import { put, select } from 'redux-saga/effects';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';
import { contentItemTypes } from '../../model';
import { getById, getAllById } from '../../selectors';
import find from '../../lib/find';

const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const contentItemsById = yield select(getAllById);
  const { id } = action.payload;

  const contentItemToRemove = yield select(getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  const context = find.extendedVerticalContext(contentItemToRemove, contentItemsById);
  if (contentItemToRemove.type !== contentItemTypes.ROOT && context == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);

  // Remove the contentItem
  yield put(removeFromState(id, context));
};

export default removeSaga;
