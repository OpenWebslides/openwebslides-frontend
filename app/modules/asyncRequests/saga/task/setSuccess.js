// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const setSuccessSaga = function* (action: a.SetSuccessAction): Saga<void> {
  const { id, value } = action.payload;
  const asyncRequest: m.SuccessAsyncRequest = {
    id,
    status: m.statusTypes.SUCCESS,
    timestamp: Date.now(),
    value,
  };

  yield put(actions.setInState(asyncRequest));
};

export default setSuccessSaga;
