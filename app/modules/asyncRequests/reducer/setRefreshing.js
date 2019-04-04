// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setRefreshing = (
  state: m.AsyncRequestsState,
  action: a.SetRefreshingAction,
): m.AsyncRequestsState => {
  const { refreshing } = action.payload;

  if (refreshing === state.refreshing) {
    return state;
  }
  else {
    return {
      ...state,
      refreshing,
    };
  }
};

export default setRefreshing;
