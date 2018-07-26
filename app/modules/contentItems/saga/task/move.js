// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import actions from '../../actions';

const moveSaga = function* (action: a.MoveAction): Saga<void> {
  const { id, nextContext } = action.payload;
  yield put(actions.moveInState(id, nextContext));
};

export default moveSaga;
