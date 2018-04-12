// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { editMedia } from '../../actions';

// eslint-disable-next-line require-yield
const updateMediaSaga = function* (action: t.UpdateMediaAction): Generator<*, *, *> {
  const { id, src, alt, caption } = action.payload;

  // [update side-effects go here]

  yield put(editMedia(id, src, alt, caption));
};

export default updateMediaSaga;
