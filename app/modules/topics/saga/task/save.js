// @flow

import contentItems from 'modules/content-items';

import { put, select } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiPatchTopicContent } from '../../actions';
import { getById } from '../../selectors';
import type { Topic } from '../../model';

const { getDenormalizedById } = contentItems.selectors;

const saveSaga = function* (action: t.SaveAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  const topic: Topic = yield select(getById, { id });
  // TODO: selector for normalized content items per topic
  const denormalizedContentItems = yield select(getDenormalizedById, {
    id: topic.rootContentItemId,
  });

  yield put(apiPatchTopicContent(topic, denormalizedContentItems));
};

export default saveSaga;
