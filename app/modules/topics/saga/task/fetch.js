// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fetch = function* (action: a.FetchAction): Saga<void> {
  yield put(actions.apiGet(action.payload.id));
};

export default fetch;
