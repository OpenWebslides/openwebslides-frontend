// @flow

import { put, select } from 'redux-saga/effects';

import generateId from '../../lib/generate-id';
import * as t from '../../actionTypes';
import { addToState, toggleEditing } from '../../actions';
import { getAllById } from '../../selectors';
import type {
} from '../../model';
import convertContextToVerticalContext from '../../lib/convertContextToVerticalContext';

const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const { type, context, propsForType } = action.payload;
  const newId = generateId();
  const contentItemsById = yield select(getAllById);
  const newContext = convertContextToVerticalContext(context, contentItemsById);

  yield put(addToState(newId, type, newContext, propsForType));
  yield put(toggleEditing(newId, true));
};

export default addSaga;
