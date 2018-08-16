// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const signinSSO = function* (action: a.SigninSSOAction): Saga<void> {
  const { apiToken, userId } = action.payload;

  // Dispatch action to set authenticated state
  const currentUserAuth: m.UserAuth = {
    apiToken,
    userId,
  };
  yield put(actions.setUserAuthInState(currentUserAuth));
};

export default signinSSO;
