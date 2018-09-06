// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { flashErrorMessage } from 'redux-flash';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPostSigninToTokenAndGetUserAuth = function* (
  action: a.ApiPostSigninToTokenAndGetUserAuthAction,
): Saga<void> {
  const { email, password } = action.payload;

  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const responseData: ApiResponseData = yield call(api.token.postSignin, email, password);

    if (responseData.token == null || responseData.body == null) {
      throw new UnexpectedHttpResponseError();
    }

    // Extract UserAuth data from response
    const { id } = responseData.body.data;
    const currentUserAuth: m.UserAuth = {
      userId: id,
      apiToken: responseData.token,
    };

    // Store UserAuth in state
    yield put(actions.setUserAuthInState(currentUserAuth));

    yield put(asyncRequests.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(flashErrorMessage('auth:signin.failure')); // #TODO solve this in a more general way
    yield put(asyncRequests.actions.setFailure(action.type, error));
  }
};

export default apiPostSigninToTokenAndGetUserAuth;
