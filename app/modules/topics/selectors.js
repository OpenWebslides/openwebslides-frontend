// @flow

import type { State } from 'types/state';
import type { TopicsState } from './index';
import type { Topic } from './model';

const getModule = (state: State): TopicsState => {
  return state.modules.topics;
};

export const getById = (state: State, id: string): Topic => {
  return getModule(state)[id];
};

export const getAllById = (state: State): { +[topicId: string]: Topic } => {
  return getModule(state);
};

export const getAll = (state: State): Array<Topic> => {
  const topicsById = getAllById(state);
  return Object.keys(topicsById).map(key => topicsById[key]);
};
