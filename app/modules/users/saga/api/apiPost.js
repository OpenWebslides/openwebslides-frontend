// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';

const apiPost = function* (action: a.ApiPostAction): Saga<void> {
  const { email, name, password, tosAccepted } = action.payload;
  yield call(api.users.post, email, name, password, tosAccepted);
};

export default apiPost;
