// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as paths from 'config/routes';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const confirmEmail = function* (action: a.ConfirmEmailAction): Saga<void> {
  const { confirmationToken } = action.payload;

  yield call(putAndReturn, actions.apiPatchConfirmation(confirmationToken));
  yield put(push(paths.AUTH_SIGNIN_ROUTE));
};

export default confirmEmail;
