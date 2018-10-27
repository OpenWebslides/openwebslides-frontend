// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const setPendingSaga = function* (action: a.SetPendingAction): Saga<void> {
  const { id } = action.payload;
  const asyncRequest: m.PendingAsyncRequest = {
    id,
    status: m.statusTypes.PENDING,
    timestamp: Date.now(),
  };

  yield put(actions.setInState(asyncRequest));
};

export default setPendingSaga;
