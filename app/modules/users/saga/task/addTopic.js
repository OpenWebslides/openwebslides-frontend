// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const addTopic = function* (action: a.AddTopicAction): Saga<void> {
  const { id, title, description } = action.payload;

  const createRequestId = yield call(
    asyncRequests.lib.putAndGetId,
    topics.actions.create(title, description, id),
  );
  const createReturnValue = yield call(
    asyncRequests.lib.takeSuccessById,
    createRequestId,
  );

  yield put(actions.addTopicId(id, createReturnValue.id));
};

export default addTopic;
