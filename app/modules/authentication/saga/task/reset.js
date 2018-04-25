// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiPostPassword } from '../../actions';

const resetSaga = function* (action: t.ResetAction): Generator<*, *, *> {
  const { email } = action.payload;

  yield put(apiPostPassword(email));
};

export default resetSaga;
