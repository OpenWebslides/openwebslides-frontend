// @flow

import { type Saga } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

// eslint-disable-next-line require-yield
const updateWithContent = function* (action: a.UpdateWithContentAction): Saga<void> {
  const { id, title, description } = action.payload;
  const topic: ?m.Topic = yield select(selectors.getById, { id });
  if (topic == null) throw new ObjectNotFoundError(`topics:topic`, id);

  // Update the topic in the backend
  // TODO: determine if this request has to be made
  // TODO: through non-empty props
  yield call(
    asyncRequests.lib.putAndReturn,
    actions.apiPatch(id, title, description),
  );

  // Update the topic content in the backend
  // TODO: determine if this request has to be made
  // TODO: through the topic.isDirty prop
  yield call(
    asyncRequests.lib.putAndReturn,
    contentItems.actions.apiPatchAllByTopicIdAndRoot(id, topic.rootContentItemId),
  );

  // Fetch the new topic from the backend so the state is up-to-date
  yield call(
    asyncRequests.lib.putAndReturn,
    actions.fetch(id),
  );

  // Mark topic as clean
  yield put(actions.setDirtyInState(id, false));
};

export default updateWithContent;
