// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getAllById = (state: State): m.TopicsById => {
  return state.modules.topics.byId;
};

export default getAllById;
