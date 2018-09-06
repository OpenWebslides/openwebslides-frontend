// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';

const apiPost = function* (action: a.ApiPostAction): Saga<void> {
  yield put(asyncRequests.actions.setPending(action.type));

  try {
    const { email, name, password, tosAccepted } = action.payload;

    yield call(api.users.post, email, name, password, tosAccepted);

    yield put(asyncRequests.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(asyncRequests.actions.setFailure(action.type, error));
  }
};

export default apiPost;
