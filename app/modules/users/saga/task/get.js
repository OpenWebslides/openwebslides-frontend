// @flow

import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiGetUser } from '../../actions';

const getSaga = function* (action: a.GetAction): Generator<*, *, *> {
  const { id } = action.payload;

  yield put(apiGetUser(id));
};

export default getSaga;
