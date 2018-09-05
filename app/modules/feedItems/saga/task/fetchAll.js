// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const fetchAllSaga = function* (action: a.FetchAllAction): Saga<void> {
  yield put(actions.apiGetAll());
};

export default fetchAllSaga;
