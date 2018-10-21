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

const discard = function* (action: a.DiscardAction): Saga<void> {
  const { id } = action.payload;
  const topic: ?m.Topic = yield select(selectors.getById, { id });
  if (topic == null) throw new ObjectNotFoundError(`topics:topic`, id);

  // Remove the topic content from the state, starting at the root content item
  yield put(contentItems.actions.removeFromState(topic.rootContentItemId));

  // Remove the topic from the state
  yield put(actions.removeFromState(id));

  // Refetch the topic from the backend
  yield call(
    asyncRequests.lib.putAndReturn,
    actions.fetch(id),
  );
};

export default discard;
