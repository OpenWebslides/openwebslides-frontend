// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';

const apiPatchConfirmation = function* (
  action: a.ApiPatchConfirmationAction,
): Saga<void> {
  const { confirmationToken } = action.payload;
  yield call(api.confirmation.patch, confirmationToken);
};

export default apiPatchConfirmation;
