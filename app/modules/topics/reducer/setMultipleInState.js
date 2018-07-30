// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.TopicsState,
  action: a.SetMultipleInStateAction,
): m.TopicsState => {
  const newTopics = {};

  if (action.payload.topics) {
    action.payload.topics.forEach((item: m.Topic): void => {
      newTopics[item.id] = item;
    });
  }

  return {
    byId: newTopics,
  };
};

export default setMultipleInState;
