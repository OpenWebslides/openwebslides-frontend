// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';

const { putAndReturn } = asyncRequests.lib;

const generateRoot = function* (action: a.GenerateRootAction): Saga<{ rootContentItemId: string }> {
  // Generate ROOT id and add a new ROOT item with this id to the state.
  const rootContentItemId = lib.generateId();
  yield put(actions.addToState(
    rootContentItemId,
    m.contentItemTypes.ROOT,
    null,
    {},
  ));

  // Generate sample content so that the user can start editing.
  yield call(putAndReturn, actions.generateContent(rootContentItemId));

  // Return the ROOT id so the caller can access the newly created contentItems.
  return { rootContentItemId };
};

export default generateRoot;
