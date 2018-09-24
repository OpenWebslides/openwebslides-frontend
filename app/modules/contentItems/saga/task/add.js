// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import selectors from '../../selectors';

const addSaga = function* (action: a.AddAction): Saga<void> {
  const { type, context, propsForType } = action.payload;
  const newId = lib.generateId();
  const contentItemsById = yield select(selectors.getAllById);
  const newContext = lib.convertContextToVerticalContext(context, contentItemsById);

  yield put(actions.addToState(newId, type, newContext, propsForType));
  yield put(actions.toggleEditing(newId, true));
};

export default addSaga;
