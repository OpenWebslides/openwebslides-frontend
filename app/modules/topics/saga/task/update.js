// @flow

import { type Saga } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const update = function* (action: a.UpdateAction): Saga<void> {
  const { id, title, description } = action.payload;

  // Update the topic in the backend.
  yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiPatch(id, title, description),
  );

  // Fetch the new topic from the backend so the state is up-to-date
  yield put(actions.fetch(id));
};

export default update;
