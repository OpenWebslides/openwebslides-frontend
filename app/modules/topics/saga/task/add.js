// @flow
import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { apiPostTopic, addToState } from '../../actions';

// eslint-disable-next-line require-yield
const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  const {
    id,
    userId,
    title,
    description,
    rootContentItemId,
    history,
  } = action.payload;

  yield put(apiPostTopic(userId, title, description));
  yield put(addToState(id, userId, title, description, rootContentItemId));

  history.replace('/library');
};

export default addSaga;
