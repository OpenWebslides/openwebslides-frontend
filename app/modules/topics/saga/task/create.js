// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const create = function* (action: a.CreateAction): Saga<void> {
  const { title, description, userId } = action.payload;
  yield put(actions.apiPost(title, description, userId));
};

export default create;
