// @flow

import _ from 'lodash';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { Topic, TopicsState } from './model';

const getModule = (state: State): TopicsState => {
  return state.modules.topics;
};

export const getById = (state: State, id: Identifier): Topic => {
  return _.get(getModule(state), id, null);
};

export const getTitleById = (state: State, id: Identifier): string => {
  return getModule(state)[id].title;
};

export const getAllTopicIdsByUserId = (state: State, userId: Identifier): Array<Identifier> => {
  const topicsById = getModule(state);

  // Flow is disabled here because of a long-standing bug: https://github.com/facebook/flow/issues/3067
  return (
    Object
      .values(topicsById) // produces array of topic objects
      // $FlowFixMe
      .filter((topic) => (topic.userId === userId))
      // $FlowFixMe
      .map((topic) => topic.id)
  );
};

export const getAll = (state: State): Array<Topic> => {
  const topicsById = getModule(state);
  return Object.keys(topicsById).map((key) => topicsById[key]);
};
