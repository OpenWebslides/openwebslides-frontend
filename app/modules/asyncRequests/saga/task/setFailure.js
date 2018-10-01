// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { type ErrorAction } from 'types/error';

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
  // #TODO write proper model / action creators etc for this
  yield put(({ type: 'ERROR', error }: ErrorAction));
};

export default setFailure;
