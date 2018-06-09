// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiGet } from '../../actions';

const getSaga = function* (action: t.GetAction): Generator<*, *, *> {
  yield put(apiGet(action.payload.id));
};

export default getSaga;
