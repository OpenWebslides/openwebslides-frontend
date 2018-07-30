// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

const getAllSaga = function* (action: a.GetAllByUserIdAction): Saga<void> {
  yield put(actions.apiGetAllByUserId(action.payload.userId));
};

export default getAllSaga;
