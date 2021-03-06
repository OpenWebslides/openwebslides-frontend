// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiConnection';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPostToken = function* (
  action: a.ApiPostToken,
): Saga<void> {
  const { email, password } = action.payload;
  const responseData: ApiResponseData = yield call(api.token.post, email, password);
  if (responseData.token == null || responseData.body == null) {
    throw new UnexpectedHttpResponseError();
  }

  // Extract UserAuth data from response
  const { id } = responseData.body.data;
  const currentUserAuth: m.UserAuth = {
    userId: id,
    refreshToken: responseData.token,
    accessToken: null,
  };

  // Store UserAuth in state
  yield put(actions.setUserAuthInState(currentUserAuth));
};

export default apiPostToken;
