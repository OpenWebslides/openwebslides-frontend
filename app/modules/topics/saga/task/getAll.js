// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiGetAllByUserId } from '../../actions';

const getAllSaga = function* (action: a.GetAllByUserIdAction): Saga<void> {
  yield put(apiGetAllByUserId(action.payload.userId));
};

export default getAllSaga;
