// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const updateDeviceType = function* (action: a.UpdateDeviceTypeAction): Saga<void> {
  const { id, deviceType } = action.payload;

  // Update the user in the backend
  yield call(putAndReturn, actions.apiPatch(
    id,
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
