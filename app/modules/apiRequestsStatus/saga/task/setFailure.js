// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as t from '../../actionTypes';
import * as m from '../../model';

const setFailure = function* (action: t.SetFailureAction): Generator<*, *, *> {
  const { requestId, error } = action.payload;
  const requestStatus: m.FailureRequestStatus = {
    status: m.statusTypes.FAILURE,
    error,
  };

  yield put(actions.setStatusInState(requestId, requestStatus));
};

export default setFailure;
