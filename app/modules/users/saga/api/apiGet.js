// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnsupportedOperationError, UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { id } = action.payload;
    const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
    if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

    const responseData: ApiResponseData = yield call(api.users.get, id, userAuth.apiToken);

    if (responseData.body == null) throw new UnexpectedHttpResponseError();

    const { attributes } = responseData.body.data;
    const user: m.User = {
      id,
      email: attributes.email,
      name: attributes.name,
      gravatarHash: attributes.gravatarHash,
    };
    yield put(actions.setMultipleInState([user]));

    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiGet;
