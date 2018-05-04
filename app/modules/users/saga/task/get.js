// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { apiGetUser } from '../../actions';

const getSaga = function* (action: t.GetAction): Generator<*, *, *> {
  const { id } = action.payload;

  yield put(apiGetUser(id));
};

export default getSaga;
