// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const create = function* (action: a.CreateAction): Saga<{ id: string }> {
  const { title, description, userId } = action.payload;

  // Create the intitial topic ROOT and placeholder content.
  const { rootContentItemId } = yield call(putAndReturn, contentItems.actions.generateRoot());
  // Create the new topic in the backend.
  const { id } = yield call(putAndReturn, actions.apiPost(
    title, description, rootContentItemId, userId,
  ));
  // Fetch the new topic from the backend so the state is up-to-date,
  // and wait for request completion.
  yield call(putAndReturn, actions.fetch(id));
  // Save the initial topic content in the backend.
  yield put(actions.patchWithContent(id));

  // Return the topic id.
  return { id };
};

export default create;
