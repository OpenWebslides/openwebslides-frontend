// @flow

import { type AppState } from 'types/redux';

const isRefreshing = (state: AppState): boolean => {
  return state.modules.asyncRequests.refreshing;
};

export default isRefreshing;
