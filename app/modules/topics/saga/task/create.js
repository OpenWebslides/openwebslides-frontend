// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

// eslint-disable-next-line import/no-internal-modules
import generateId from 'modules/contentItems/lib/generateId'; // #TODO

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const create = function* (action: a.CreateAction): Saga<void> {
  const { title, description, userId } = action.payload;

  // Generate random rootContentItemId to include in API request
  const rootContentItemId = generateId();

  yield put(actions.apiPost(title, description, rootContentItemId, userId));
};

export default create;
