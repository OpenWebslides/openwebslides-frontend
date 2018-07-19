// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import apiDeleteToken from './apiDeleteToken';
import apiPostEmailToConfirmation from './apiPostEmailToConfirmation';
import apiPostEmailToPassword from './apiPostEmailToPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.API_DELETE_TOKEN, apiDeleteToken),
    takeEvery(t.API_POST_EMAIL_TO_CONFIRMATION, apiPostEmailToConfirmation),
    takeEvery(t.API_POST_EMAIL_TO_PASSWORD, apiPostEmailToPassword),
    takeEvery(t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, apiPostSigninToTokenAndGetUserAuth),
  ]);
};

const apiSagas = {
  apiDeleteToken,
  apiPostEmailToConfirmation,
  apiPostEmailToPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export { apiSagas };
export default apiSaga;
