// @flow

import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiGet } from '../../actions';

const getSaga = function* (action: a.GetAction): Generator<*, *, *> {
  yield put(apiGet(action.payload.id));
};

export default getSaga;
