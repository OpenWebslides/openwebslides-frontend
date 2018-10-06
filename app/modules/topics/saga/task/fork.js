// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const fork = function* (action: a.ForkAction): Saga<{ id: string }> {
  const { id } = action.payload;

  // Fork the topic in the backend
  const { id: forkedId } = yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiPostFork(id),
  );

  // Fetch the new topic from the backend
  yield call(putAndReturn, actions.fetch(forkedId));

  // Return the forked topic id
  return { id: forkedId };
};

export default fork;
