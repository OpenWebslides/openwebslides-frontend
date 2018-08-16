// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import contentItems from 'modules/contentItems';

import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const patchWithContent = function* (action: a.PatchWithContentAction): Saga<void> {
  const { id } = action.payload;
  const topic: ?m.Topic = yield select(selectors.getById, { id });
  if (topic == null) throw new ObjectNotFoundError(`topics:topic`, id);

  // #TODO patch topic title & description
  yield put(contentItems.actions.apiPatchAllByTopicIdAndRoot(id, topic.rootContentItemId));
};

export default patchWithContent;