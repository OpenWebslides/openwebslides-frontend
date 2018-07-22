// @flow

import { put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as t from '../../actionTypes';
import { apiPost } from '../../actions';

// eslint-disable-next-line require-yield
const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const {
    userId,
    title,
    description,
  } = action.payload;

  yield put(apiPost(userId, title, description));

  // Wait for api request to complete #TODO use unique request identifiers for this
  yield take('apiRequestsStatus/SET_SUCCESS');
  // Then redirect
  yield put(push('/library'));
};

export default addSaga;
