// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getAllById = (state: AppState): m.AsyncRequestsById => {
  return state.modules.asyncRequests.byId;
};

export default getAllById;
