// @flow

import { type State } from 'types/state';

import getAllById from './getAllById';

// #TODO use reselect
const getAllTopicIdsByUserId = (state: State, userId: string): $ReadOnlyArray<string> => {
  const topicsById = getAllById(state);

  return (
    Object
      .keys(topicsById)
      .map((key) => topicsById[key])
      .filter((topic) => topic.userId === userId)
      .map((topic) => topic.id)
  );
};

export default getAllTopicIdsByUserId;
