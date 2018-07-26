// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fetch = function* (action: a.FetchAction): Saga<void> {
  const { id } = action.payload;
  yield put(actions.apiGet(id));
};

export default fetch;
