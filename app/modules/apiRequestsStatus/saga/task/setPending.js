// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const setPendingSaga = function* (action: a.SetPendingAction): Saga<void> {
  const { requestId } = action.payload;
  const requestStatus: m.PendingRequestStatus = {
    status: m.statusTypes.PENDING,
  };

  yield put(actions.setStatusInState(requestId, requestStatus));
};

export default setPendingSaga;
