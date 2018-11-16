// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import * as a from '../../actionTypes';

const apiPatch = function* (action: a.ApiPatchAction): Saga<void> {
  const { id, read } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  yield call(api.alerts.patch, id, read, userAuth.apiToken);
};

export default apiPatch;
