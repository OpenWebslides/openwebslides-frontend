// @flow

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';

import actions from '../../actions';
import * as a from '../../actionTypes';

const confirmEmail = function* (action: a.ConfirmEmailAction): Saga<void> {
  const { confirmationToken } = action.payload;
  yield put(actions.apiPatchConfirmation(confirmationToken));

  // Wait for api request to complete #TODO use unique request identifiers for this
  yield take('apiRequestsStatus/SET_SUCCESS');
  // Then redirect
  yield put(push(paths.AUTH_SIGNIN_ROUTE));
};

export default confirmEmail;
