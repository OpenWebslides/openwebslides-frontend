// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const confirmEmail = function* (action: a.ConfirmEmailAction): Generator<*, *, *> {
  const { confirmationToken } = action.payload;
  yield put(actions.apiPostConfirmation(confirmationToken));
};

export default confirmEmail;
