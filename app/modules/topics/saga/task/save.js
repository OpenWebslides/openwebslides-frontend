// @flow

import { put, select } from 'redux-saga/effects';

import contentItems from 'modules/contentItems';

import * as t from '../../actionTypes';
import { apiPatchContent } from '../../actions';
import { getById } from '../../selectors';
import type { Topic } from '../../model';

const saveSaga = function* (action: t.SaveContentAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  const topic: Topic = yield select(getById, { id });
  const contentItemDescendants = yield select(
    contentItems.selectors.getSelfAndAllDescendantsById,
    { id: topic.rootContentItemId },
  );

  yield put(apiPatchContent(id, contentItemDescendants));
};

export default saveSaga;
