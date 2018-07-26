// @flow

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { USER_PROFILE_ROUTE } from 'config/routes';

import * as a from '../../actionTypes';
import { apiPost } from '../../actions';

// eslint-disable-next-line require-yield
const addSaga = function* (action: a.AddAction): Saga<void> {
  const {
    userId,
    title,
    description,
  } = action.payload;

  yield put(apiPost(userId, title, description));

  // Wait for api request to complete #TODO use unique request identifiers for this
  yield take('apiRequestsStatus/SET_SUCCESS');
  // Then redirect
  yield put(push(USER_PROFILE_ROUTE));
};

export default addSaga;
