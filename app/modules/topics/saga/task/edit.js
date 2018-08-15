// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';

// eslint-disable-next-line require-yield
const edit = function* (action: a.EditAction): Saga<void> {
  const { id, editedProps } = action.payload;
  yield put(actions.editInState(id, editedProps));
};

export default edit;
