// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';

const apiPostConfirmation = function* (
  action: a.ApiPostConfirmationAction,
): Saga<void> {
  const { email } = action.payload;
  yield call(api.confirmation.post, email);
};

export default apiPostConfirmation;
