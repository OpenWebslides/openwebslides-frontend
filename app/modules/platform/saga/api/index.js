// @flow

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import * as a from '../../actionTypes';

import apiDeleteToken from './apiDeleteToken';
import apiPatchConfirmation from './apiPatchConfirmation';
import apiPostConfirmation from './apiPostConfirmation';
import apiPatchPassword from './apiPatchPassword';
import apiPostPassword from './apiPostPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE_TOKEN, apiDeleteToken),
    takeEvery(a.API_PATCH_CONFIRMATION, apiPatchConfirmation),
    takeEvery(a.API_POST_CONFIRMATION, apiPostConfirmation),
    takeEvery(a.API_PATCH_PASSWORD, apiPatchPassword),
    takeEvery(a.API_POST_PASSWORD, apiPostPassword),
    takeEvery(a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, apiPostSigninToTokenAndGetUserAuth),
  ]);
};

const apiSagas = {
  apiDeleteToken,
  apiPatchConfirmation,
  apiPostConfirmation,
  apiPatchPassword,
  apiPostPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export { apiSagas };
export default apiSaga;
