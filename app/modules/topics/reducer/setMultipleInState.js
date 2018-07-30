// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.TopicsState,
  action: a.SetMultipleInStateAction,
): m.TopicsState => {
  const { topics } = action.payload;

  if (topics.length === 0) {
    return state;
  }
  else {
    const newById = { ...state.byId };

    topics.forEach((topic: m.Topic): void => {
      newById[topic.id] = topic;
    });

    return {
      ...state,
      byId: newById,
    };
  }
};

export default setMultipleInState;
