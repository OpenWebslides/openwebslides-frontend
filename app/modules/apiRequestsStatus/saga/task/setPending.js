// @flow

import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as t from '../../actionTypes';
import * as m from '../../model';

const setPendingSaga = function* (action: t.SetPendingAction): Generator<*, *, *> {
  const { requestId } = action.payload;
  const requestStatus: m.PendingRequestStatus = {
    status: m.statusTypes.PENDING,
  };

  yield put(actions.setStatusInState(requestId, requestStatus));
};

export default setPendingSaga;