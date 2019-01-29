// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';
import { UnsupportedOperationError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const updateDeviceType = function* (action: a.UpdateDeviceTypeAction): Saga<void> {
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  const { deviceType } = action.payload;

  // Update the user in the backend
  yield call(putAndReturn, actions.apiPatch(
    userAuth.userId,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    deviceType,
  ));
};

export default updateDeviceType;
