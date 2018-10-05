// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fork = function* (action: a.ForkAction): Saga<void> {
  yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiPostFork(action.payload.id),
  );
};

export default fork;
