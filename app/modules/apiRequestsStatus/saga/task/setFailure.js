// @flow

import { put } from 'redux-saga/effects';

import { type ErrorAction } from 'types/error';

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
  // #TODO write proper model / action creators etc for this
  yield put(({ type: 'ERROR', error }: ErrorAction));
};

export default setFailure;
