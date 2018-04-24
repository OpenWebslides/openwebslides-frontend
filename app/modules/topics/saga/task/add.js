// @flow
import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { addToState } from '../../actions';

// eslint-disable-next-line require-yield
const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  console.log(`addSaga called with action ${JSON.stringify(action)}`);

  const {
    userId,
    title,
    description,
    history,
  } = action.payload;

  yield put(addToState(userId, title, description));
  yield history.replace('/library');

};

export default addSaga;
