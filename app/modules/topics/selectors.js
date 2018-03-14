// @flow

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { Topic, TopicsState } from './model';

const getModule = (state: State): TopicsState => {
  return state.modules.topics;
};

export const getById = (state: State, id: Identifier): Topic => {
  return getModule(state)[id];
};

export const getAllById = (state: State): { +[topicId: Identifier]: Topic } => {
  return getModule(state);
};

export const getAll = (state: State): Array<Topic> => {
  const topicsById = getAllById(state);
  return Object.keys(topicsById).map((key) => topicsById[key]);
};
