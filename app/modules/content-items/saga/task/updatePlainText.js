// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { editPlainText } from '../../actions';

// eslint-disable-next-line require-yield
const updatePlainTextSaga = function* (action: t.UpdatePlainTextAction): Generator<*, *, *> {
  const { id, text } = action.payload;
  const newId = id;
  let newText: ?string = text;

  if (text != null && text === '') {
    newText = `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`;
  }

  yield put(editPlainText(newId, newText));
};

export default updatePlainTextSaga;
