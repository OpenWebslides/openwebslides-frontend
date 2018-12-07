// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const updatePassword = function* (action: a.UpdatePasswordAction): Saga<void> {
  const { id, currentPassword, password } = action.payload;

  // Update the user in the backend
  yield call(putAndReturn, actions.apiPatch(id, undefined, undefined, undefined, currentPassword, password));
};

export default updatePassword;
