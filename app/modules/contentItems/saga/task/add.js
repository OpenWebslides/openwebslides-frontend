// @flow

import { put, select } from 'redux-saga/effects';

import generateId from '../../lib/generateId';
import * as t from '../../actionTypes';
import actions from '../../actions';
import selectors from '../../selectors';
import convertContextToVerticalContext from '../../lib/convertContextToVerticalContext';

const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const { type, context, propsForType } = action.payload;
  const newId = generateId();
  const contentItemsById = yield select(selectors.getAllById);
  const newContext = convertContextToVerticalContext(context, contentItemsById);

  yield put(actions.addToState(newId, type, newContext, propsForType));
  yield put(actions.toggleEditing(newId, true));
};

export default addSaga;
