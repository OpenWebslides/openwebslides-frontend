// @flow

import contentItems from 'modules/content-items';

import { put, select } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiPatchTopicContent } from '../../actions';
import { getById } from '../../selectors';
import type { Topic } from '../../model';

const { getNormalizedById } = contentItems.selectors;

const saveSaga = function* (action: t.SaveContentAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  const topic: Topic = yield select(getById, { id });
  const normalizedContentItems = yield select(getNormalizedById, {
    id: topic.rootContentItemId,
  });

  yield put(apiPatchTopicContent(id, normalizedContentItems));
};

export default saveSaga;
