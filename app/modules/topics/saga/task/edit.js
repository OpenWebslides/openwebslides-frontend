// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as a from '../../actionTypes';
import { editInState } from '../../actions';

// eslint-disable-next-line require-yield
const editSaga = function* (action: a.EditAction): Saga<void> {
  const {
    id,
    title,
    description,
  } = action.payload;

  yield put(editInState(id, title, description));
};

export default editSaga;
