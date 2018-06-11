// @flow

import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';

const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const { id } = action.payload;

  // Remove the contentItem
  yield put(removeFromState(id));
};

export default removeSaga;
