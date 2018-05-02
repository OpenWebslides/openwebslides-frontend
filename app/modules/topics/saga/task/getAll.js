// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiGetAllTopics } from '../../actions';

const getAllSaga = function* (action: t.GetAllAction): Generator<*, *, *> {
  yield put(apiGetAllTopics(action.payload.userId));
};

export default getAllSaga;
