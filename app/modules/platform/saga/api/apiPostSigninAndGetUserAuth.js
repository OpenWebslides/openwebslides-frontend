// @flow

import { call, put } from 'redux-saga/effects';
import { flashErrorMessage } from 'redux-flash';

import api from 'api';
import { type ApiResponseData } from 'lib/ApiRequest';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import users from 'modules/users';

import actions from '../../actions';
import * as t from '../../actionTypes';
import * as m from '../../model';

const apiPostSigninAndGetUserAuth = function* (
  action: t.ApiPostSigninAndGetUserAuthAction,
): Generator<*, *, *> {
  const { email, password } = action.payload;

  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const responseData: ApiResponseData = yield call(api.token.post, email, password);

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
      firstName: responseData.body.data.attributes.firstName,
      lastName: responseData.body.data.attributes.lastName,
      email,
    };

    // Store currentUser object in the state, so that it can be selected using userAuth.userId
    yield put(users.actions.setItemInState(currentUser));

    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(flashErrorMessage('auth:signin.failure')); // #TODO solve this in a more general way
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiPostSigninAndGetUserAuth;
