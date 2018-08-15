// @flow

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { UnsupportedOperationError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const removeTopicId = function* (action: a.RemoveTopicIdAction): Saga<void> {
  const { id, topicId } = action.payload;
  const userToEdit: m.User = yield select(selectors.getById, { id });

  if (!_.includes(userToEdit.topicIds, topicId)) {
    throw new UnsupportedOperationError(`The user with id "${id}" does not have a topic with id "${topicId}".`);
  }

  yield put(actions.editTopicIdsInState(id, _.without(userToEdit.topicIds, topicId)));
};

export default removeTopicId;
