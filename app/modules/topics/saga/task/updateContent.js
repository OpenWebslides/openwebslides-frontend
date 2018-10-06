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

const { putAndReturn } = asyncRequests.lib;

const updateContent = function* (action: a.UpdateContentAction): Saga<void> {
  const { id } = action.payload;
  const topic: ?m.Topic = yield select(selectors.getById, { id });
  if (topic == null) throw new ObjectNotFoundError(`topics:topic`, id);

  // #TODO patch topic title & description
  yield call(putAndReturn, contentItems.actions.apiPatchAllByTopicIdAndRoot(
    id, topic.rootContentItemId,
  ));
  yield put(actions.setDirtyInState(id, false));
};

export default updateContent;
