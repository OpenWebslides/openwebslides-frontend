// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as t from '../../actionTypes';

const confirmEmail = function* (action: t.ConfirmEmailAction): Generator<*, *, *> {
  const { email } = action.payload;
  yield put(actions.apiPostEmailToConfirmation(email));
};

export default confirmEmail;
