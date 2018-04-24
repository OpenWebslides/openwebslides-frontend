// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { editPlainTextInState } from '../../actions';

// eslint-disable-next-line require-yield
const editPlainTextSaga = function* (action: t.EditPlainTextAction): Generator<*, *, *> {
  const { id, text } = action.payload;
  const newId = id;
  let newText: ?string = text;

  if (text != null && text === '') {
    newText = `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`;
  }

  yield put(editPlainTextInState(newId, newText));
};

export default editPlainTextSaga;
