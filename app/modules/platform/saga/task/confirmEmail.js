// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as t from '../../actionTypes';

const confirmEmail = function* (action: t.ConfirmEmailAction): Generator<*, *, *> {
  const { confirmationToken } = action.payload;
  yield put(actions.apiPostConfirmation(confirmationToken));
};

export default confirmEmail;
