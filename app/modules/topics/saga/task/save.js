// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const saveSaga = function* (action: a.SaveContentAction): Saga<void> {
  const {
    id,
  } = action.payload;

  const topic: m.Topic = yield select(selectors.getById, { id });
  const contentItemDescendants = yield select(
    contentItems.selectors.getSelfAndAllDescendantsById,
    { id: topic.rootContentItemId },
  );

  yield put(actions.apiPatchContent(id, contentItemDescendants));
};

export default saveSaga;
