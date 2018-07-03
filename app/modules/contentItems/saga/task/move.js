// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import actions from '../../actions';

const moveSaga = function* (action: t.MoveAction): Generator<*, *, *> {
  const { id, nextContext } = action.payload;
  yield put(actions.moveInState(id, nextContext));
};

export default moveSaga;
