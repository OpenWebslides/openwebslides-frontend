// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const loadSaga = function* (action: a.LoadContentAction): Saga<void> {
  const {
    id,
  } = action.payload;

  yield put(actions.apiGet(id));
  yield put(actions.apiGetContent(id));
};

export default loadSaga;
