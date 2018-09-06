// @flow

import { type Saga } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import { CorruptedInternalStateError } from 'errors';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

const addTopic = function* (action: a.AddTopicAction): Saga<void> {
  const { id, title, description } = action.payload;

  yield put(topics.actions.create(title, description, id));

  // Wait for api request to complete #TODO use unique request identifiers for this
  const successAction = yield take('asyncRequests/SET_SUCCESS');

  // Get the new topic id from the success action and add it to the user's topicIds
  const { id: asyncRequestId, value } = successAction.payload;
  // #TODO note: this currently causes an error
  // which I can't easily fix until saga communication has been implemented
  if (asyncRequestId !== 'topics/API_POST' || value == null || value.id == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
  yield put(actions.addTopicId(id, value.id));
};

export default addTopic;
