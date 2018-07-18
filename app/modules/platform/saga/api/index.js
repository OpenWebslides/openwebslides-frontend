// @flow

import { all, takeEvery } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import apiDeleteToken from './apiDeleteToken';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostPassword from './apiPostPassword';
import apiPostSigninAndGetUserAuth from './apiPostSigninAndGetUserAuth';

const apiSaga = function* (): Generator<*, *, *> {
  yield all([
    takeEvery(t.API_DELETE_TOKEN, apiDeleteToken),
    takeEvery(t.API_POST_CONFIRMATION, apiPostConfirmation),
    takeEvery(t.API_POST_PASSWORD, apiPostPassword),
    takeEvery(t.API_POST_SIGNIN_AND_GET_USER_AUTH, apiPostSigninAndGetUserAuth),
  ]);
};

const apiSagas = {
  apiDeleteToken,
  apiPostConfirmation,
  apiPostPassword,
  apiPostSigninAndGetUserAuth,
};

export { apiSagas };
export default apiSaga;
