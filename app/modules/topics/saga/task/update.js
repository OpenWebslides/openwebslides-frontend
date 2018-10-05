// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const update = function* (action: a.UpdateAction): Saga<void> {
  const { id, updatedProps } = action.payload;

  yield put(actions.editInState(id, updatedProps));

  // TODO: API call
};

export default update;
