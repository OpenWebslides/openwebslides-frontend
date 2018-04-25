// @flow
import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiPostTopic } from '../../actions';

// eslint-disable-next-line require-yield
const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const {
    userId,
    title,
    description,
    history,
  } = action.payload;

  yield put(apiPostTopic(userId, title, description));

  // yield put(addToState(userId, title, description));
  history.replace('/library');
};

export default addSaga;
