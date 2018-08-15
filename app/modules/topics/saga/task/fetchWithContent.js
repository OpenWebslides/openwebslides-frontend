// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fetchWithContent = function* (action: a.FetchWithContentAction): Saga<void> {
  const { id } = action.payload;

  yield put(actions.apiGet(id));
  yield put(contentItems.actions.apiGetAllByTopicId(id));
  yield put(actions.toggleContentFetched(id));
};

export default fetchWithContent;
