// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const remove = function* (action: a.RemoveAction): Saga<void> {
  const { id } = action.payload;
  yield put(actions.apiDelete(id));
  yield put(actions.removeFromState(id));
};

export default remove;
