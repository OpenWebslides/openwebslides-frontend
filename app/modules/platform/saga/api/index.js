// @flow

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import apiDeleteToken from './apiDeleteToken';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostEmailToConfirmation from './apiPostEmailToConfirmation';
import apiPostEmailToPassword from './apiPostEmailToPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE_TOKEN, apiDeleteToken),
    takeEvery(a.API_POST_CONFIRMATION, apiPostConfirmation),
    takeEvery(a.API_POST_EMAIL_TO_CONFIRMATION, apiPostEmailToConfirmation),
    takeEvery(a.API_POST_EMAIL_TO_PASSWORD, apiPostEmailToPassword),
    takeEvery(a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, apiPostSigninToTokenAndGetUserAuth),
  ]);
};

const apiSagas = {
  apiDeleteToken,
  apiPostConfirmation,
  apiPostEmailToConfirmation,
  apiPostEmailToPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export { apiSagas };
export default apiSaga;
