// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const confirmEmail = function* (action: a.ConfirmEmailAction): Saga<void> {
  const { confirmationToken } = action.payload;
  yield put(actions.apiPatchConfirmation(confirmationToken));
};

export default confirmEmail;
