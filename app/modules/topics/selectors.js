// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';

import { type State } from 'types/state';

import * as m from './model';

const getModule = (state: State): m.TopicsState => {
  return state.modules.topics;
};

export const getAllById = (state: State): m.TopicsById => {
  return getModule(state).byId;
};

export const getAll = createSelector(
  [getAllById],
  (topicsById: m.TopicsById): $ReadOnlyArray<m.Topic> => {
    return Object.keys(topicsById).map((key) => topicsById[key]);
  },
);

export const getById = (state: State, props: { id: string }): m.Topic => {
  const { id } = props;
  return _.get(getAllById(state), id, null);
};

export const getAllTopicIdsByUserId = (state: State, userId: string): $ReadOnlyArray<string> => {
  const topicsById = getAllById(state);

  return (
    Object
      .keys(topicsById)
      .map((key) => topicsById[key])
      .filter((topic) => topic.userId === userId)
      .map((topic) => topic.id)
  );
};
