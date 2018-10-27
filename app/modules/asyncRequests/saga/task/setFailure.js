// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const setFailure = function* (action: a.SetFailureAction): Saga<void> {
  const { id, error } = action.payload;
  const asyncRequest: m.FailureAsyncRequest = {
    id,
    status: m.statusTypes.FAILURE,
    error,
  };

  yield put(actions.setInState(asyncRequest));
};

export default setFailure;
