// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const get = function* (action: a.GetAction): Saga<void> {
  yield put(actions.apiGet(action.payload.id));
};

export default get;
