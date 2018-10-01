// @flow

import _ from 'lodash';

import * as a from '../actionTypes';
import * as m from '../model';

const setInState = (
  state: m.AsyncRequestsState,
  action: a.SetInStateAction,
): m.AsyncRequestsState => {
  const { asyncRequest } = action.payload;

  if (_.isEqual(asyncRequest, state.byId[asyncRequest.id])) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [asyncRequest.id]: asyncRequest,
      },
    };
  }
};

export default setInState;
