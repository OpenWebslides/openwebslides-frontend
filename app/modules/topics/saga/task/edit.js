// @flow
import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { editInState } from '../../actions';

// eslint-disable-next-line require-yield
const editSaga = function* (action: t.EditAction): Generator<*, *, *> {
  const {
    id,
    title,
    description,
  } = action.payload;

  yield put(editInState(id, title, description));
};

export default editSaga;
