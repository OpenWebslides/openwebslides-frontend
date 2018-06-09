// @flow

import contentItems from 'modules/content-items';

import { put, select } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiPatchTopicContent } from '../../actions';
import { getById } from '../../selectors';
import type { Topic } from '../../model';

const { getAllDescendantsById } = contentItems.selectors;

const saveSaga = function* (action: t.SaveContentAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  const topic: Topic = yield select(getById, { id });
  const contentItemDescendants = yield select(getAllDescendantsById, {
    id: topic.rootContentItemId,
  });

  yield put(apiPatchTopicContent(id, contentItemDescendants));
};

export default saveSaga;
