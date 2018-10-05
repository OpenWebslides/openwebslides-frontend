// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const fetchAllSaga = function* (action: a.FetchAllAction): Saga<void> {
  yield call(putAndReturn, actions.apiGetAll());
};

export default fetchAllSaga;
