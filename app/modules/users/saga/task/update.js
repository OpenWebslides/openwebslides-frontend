// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const update = function* (action: a.UpdateAction): Saga<void> {
  const { id, name, locale, alertEmails } = action.payload;
  yield call(putAndReturn, actions.apiPatch(id, name, locale, alertEmails));
};

export default update;
