// @flow

/* eslint-disable max-len, sort-imports */

import { type Saga } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import asyncRequestSagaWrapper from 'lib/asyncRequestSagaWrapper';

import * as a from '../../actionTypes';

import apiDeleteToken from './apiDeleteToken';
import apiPatchConfirmation from './apiPatchConfirmation';
import apiPostConfirmation from './apiPostConfirmation';
import apiPatchPassword from './apiPatchPassword';
import apiPostPassword from './apiPostPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSaga = function* (): Saga<void> {
  yield all([
    takeEvery(a.API_DELETE_TOKEN, asyncRequestSagaWrapper, apiDeleteToken),
    takeEvery(a.API_PATCH_CONFIRMATION, asyncRequestSagaWrapper, apiPatchConfirmation),
    takeEvery(a.API_POST_CONFIRMATION, asyncRequestSagaWrapper, apiPostConfirmation),
    takeEvery(a.API_PATCH_PASSWORD, asyncRequestSagaWrapper, apiPatchPassword),
    takeEvery(a.API_POST_PASSWORD, asyncRequestSagaWrapper, apiPostPassword),
    takeEvery(a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, asyncRequestSagaWrapper, apiPostSigninToTokenAndGetUserAuth),
  ]);
};

const apiSagas = {
  apiDeleteToken,
  apiPatchConfirmation,
  apiPatchPassword,
  apiPostConfirmation,
  apiPostPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export { apiSagas };
export default apiSaga;
