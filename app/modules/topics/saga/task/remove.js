// @flow
import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiDeleteTopic } from '../../actions';

// eslint-disable-next-line require-yield
const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const {
    id,
  } = action.payload;

  yield put(apiDeleteTopic(id));
};

export default removeSaga;
