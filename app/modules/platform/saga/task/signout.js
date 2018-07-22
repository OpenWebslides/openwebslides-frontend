// @flow

import { put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const signout = function* (action: a.SignoutAction): Generator<*, *, *> {
  const userAuth: ?m.UserAuth = yield select(selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  yield put(actions.apiDeleteToken(userAuth.apiToken));
  yield put(actions.setUserAuthInState(null));
};

export default signout;
