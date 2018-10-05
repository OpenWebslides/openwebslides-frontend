// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const add = function* (action: a.AddAction): Saga<void> {
  const { type, context, propsForType } = action.payload;
  const contentItemsById = yield select(selectors.getAllById);

  // Generate random id for the new contentItem
  const newId = lib.generateId();
  // Convert general context to VerticalContext so it can be processed by addToState reducer
  const newContext = lib.convertContextToVerticalContext(context, contentItemsById);

  // Add a new contentItem with the passed props to the state
  yield put(actions.addToState(newId, type, newContext, propsForType));
  // Toggle the new contentItems isEditing status to TRUE,
  // so that the user can immediately start typing
  yield call(putAndReturn, actions.toggleEditing(newId, true));
};

export default add;
