// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fetch = function* (action: a.FetchAction): Saga<void> {
  yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiGet(action.payload.id),
  );
};

export default fetch;
