// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import contentItems from 'modules/contentItems';

import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const save = function* (action: a.SaveContentAction): Saga<void> {
  const { id } = action.payload;
  const topic: ?m.Topic = yield select(selectors.getById, { id });
  if (topic == null) throw new ObjectNotFoundError(`topics:topic`, id);

  // #TODO save topic title & description

  if (topic.rootContentItemId != null) {
    yield put(contentItems.actions.apiPatchAllByTopicIdAndRoot(id, topic.rootContentItemId));
  }
};

export default save;
