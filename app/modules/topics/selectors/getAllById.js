// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getAllById = (state: AppState): m.TopicsById => {
  return state.modules.topics.byId;
};

export default getAllById;
