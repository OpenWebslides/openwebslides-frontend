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
  // console.log(getModule(state)[id]);
  return getModule(state)[id].title;
};

// eslint-disable-next-line
export const getAllTopicIdsWithUserId = (state: State, userId: Identifier): Array<Identifier> => {
  const topicsById = getModule(state);
  /* DEBUG
  console.log('result from getModule()');
  console.log(topicsById);
  const keying = Object.keys(topicsById);
  console.log('result from keying');
  console.log(keying);
  const mapping = Object.keys(topicsById).map((key) => topicsById[key]);
  console.log('result from mapping');
  console.log(mapping);
  const result = Object
  .keys(topicsById).map((key) => topicsById[key]).filter((topic) => topic.userId === userId);
  console.log('result from filtering');
  console.log(result);
  */

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
  /*
  console.log('result from topicsById()');
  console.log(topicsById);
  const mapping = Object.keys(topicsById).map((key) => topicsById[key]);
  console.log('result from mapping');
  console.log(mapping);
  */
  return Object.keys(topicsById).map((key) => topicsById[key]);
};
