// @flow
import { put } from 'redux-saga/effects';
import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';

// eslint-disable-next-line require-yield
const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  console.log(`removeSaga called with action ${JSON.stringify(action)}`);

  yield put(removeFromState(action.payload.id));
  yield console.log('HIDE MODAL');
};

export default removeSaga;
