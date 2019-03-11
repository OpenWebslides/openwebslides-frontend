// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const setUserAuth = function* (action: a.SetUserAuthAction): Saga<void> {
  const { userId, refreshToken, accessToken } = action.payload;

  // Dispatch action to set authenticated state
  const currentUserAuth: m.UserAuth = {
    userId,
    refreshToken,
    accessToken,
  };
  yield put(actions.setUserAuthInState(currentUserAuth));
};

export default setUserAuth;
