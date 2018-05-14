// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiGetTopic } from '../../actions';

const getSaga = function* (action: t.GetAction): Generator<*, *, *> {
  yield put(apiGetTopic(action.payload.id));
};

export default getSaga;
