// @flow

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { USER_PROFILE_ROUTE } from 'config/routes';

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const add = function* (action: a.AddAction): Saga<void> {
  const { title, description, userId } = action.payload;

  yield put(actions.apiPost(title, description, userId));

  // Wait for api request to complete #TODO use unique request identifiers for this
  yield take('apiRequestsStatus/SET_SUCCESS');
  // Then redirect
  yield put(push(USER_PROFILE_ROUTE));
};

export default add;
