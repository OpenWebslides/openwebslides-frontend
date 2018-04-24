// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiPostConfirmation } from '../../actions';

const confirmSaga = function* (action: t.ConfirmAction): Generator<*, *, *> {
  const { email } = action.payload;

  yield put(apiPostConfirmation(email));
};

export default confirmSaga;
