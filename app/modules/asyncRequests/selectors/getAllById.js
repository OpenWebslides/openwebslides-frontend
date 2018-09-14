// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getAllById = (state: State): m.AsyncRequestsById => {
  return state.modules.asyncRequests.byId;
};

export default getAllById;
