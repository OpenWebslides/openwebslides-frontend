// @flow

import { call, put } from 'redux-saga/effects';
import { flashErrorMessage } from 'redux-flash';

import api from 'api';
import { type ApiResponseData } from 'lib/ApiRequest';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import users from 'modules/users';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPostSigninToTokenAndGetUserAuth = function* (
  action: a.ApiPostSigninToTokenAndGetUserAuthAction,
): Generator<*, *, *> {
  const { email, password } = action.payload;

  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const responseData: ApiResponseData = yield call(api.token.postSignin, email, password);

    // Get flow to stop complaining about token possibly being NULL
    if (responseData.token == null) {
      throw new Error(`This shouldn't happen`);
    }

    // Extract UserAuth data from response
    const currentUserAuth: m.UserAuth = {
      userId: responseData.body.data.id,
      apiToken: responseData.token,
    };

    // Store UserAuth in state
    yield put(actions.setUserAuthInState(currentUserAuth));

    // Extract currentUser object from response
    const currentUser: users.model.User = {
      id: responseData.body.data.id,
      email,
      name: responseData.body.data.attributes.name,
    };

    // Store currentUser object in the state, so that it can be selected using userAuth.userId
    yield put(users.actions.setMultipleInState([currentUser]));

    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(flashErrorMessage('auth:signin.failure')); // #TODO solve this in a more general way
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiPostSigninToTokenAndGetUserAuth;
