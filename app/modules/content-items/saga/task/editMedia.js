// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { editMediaInState } from '../../actions';

// eslint-disable-next-line require-yield
const editMediaSaga = function* (action: t.EditMediaAction): Generator<*, *, *> {
  const { id, src, alt, caption } = action.payload;

  // [Edit side-effects go here]

  yield put(editMediaInState(id, src, alt, caption));
};

export default editMediaSaga;
