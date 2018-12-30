// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const log = function* (action: a.LogAction): Saga<void> {
  const { errorObject } = action.payload;
  const loggedError: m.LoggedError = {
    errorObject,
    timestamp: Date.now(),
  };

  // Log the error in the state.
  yield put(actions.addToState(loggedError));

  // Output the error to the console.
  yield call(console.error, `${errorObject.constructor.name}: ${errorObject.message}`);
};

export default log;
