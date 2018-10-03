// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const fetchWithContent = function* (action: a.FetchWithContentAction): Saga<void> {
  const { id } = action.payload;

  yield call(putAndReturn, actions.apiGet(id));
  yield call(putAndReturn, contentItems.actions.apiGetAllByTopicId(id));
  yield put(actions.toggleContentFetchedInState(id));
};

export default fetchWithContent;
