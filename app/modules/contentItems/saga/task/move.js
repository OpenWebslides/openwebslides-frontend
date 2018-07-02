// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { moveInState } from '../../actions';

const moveSaga = function* (action: t.MoveAction): Generator<*, *, *> {
  const { id, nextContext } = action.payload;
  yield put(moveInState(id, nextContext));
};

export default moveSaga;
