// @flow
import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { setInState } from '../../actions';

// eslint-disable-next-line require-yield
const redirectSaga = function* (action: t.RedirectAction): Generator<*, *, *> {
  const {
    location,
  } = action.payload;

  yield put(setInState(location));
};

export default redirectSaga;
