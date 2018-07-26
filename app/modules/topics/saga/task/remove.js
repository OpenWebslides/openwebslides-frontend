// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { apiDelete } from '../../actions';

// eslint-disable-next-line require-yield
const removeSaga = function* (action: a.RemoveAction): Saga<void> {
  const {
    id,
  } = action.payload;

  yield put(apiDelete(id));
};

export default removeSaga;
