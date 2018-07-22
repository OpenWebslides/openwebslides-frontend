// @flow

import _ from 'lodash';

import * as a from '../actionTypes';
import * as m from '../model';

const setStatusInState = (
  state: m.ApiRequestsStatusState,
  action: a.SetStatusInStateAction,
): m.ApiRequestsStatusState => {
  const { requestId, requestStatus } = action.payload;

  if (_.isEqual(requestStatus, state[requestId])) {
    return state;
  }
  else {
    return {
      ...state,
      [requestId]: requestStatus,
    };
  }
};

export default setStatusInState;
