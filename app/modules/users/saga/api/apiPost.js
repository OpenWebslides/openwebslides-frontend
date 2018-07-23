// @flow

import { call, put } from 'redux-saga/effects';

import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import * as a from '../../actionTypes';

const apiPost = function* (action: a.ApiPostAction): Generator<*, *, *> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { email, firstName, lastName, password, tosAccepted } = action.payload;

    yield call(api.users.post, email, firstName, lastName, password, tosAccepted);

    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiPost;
