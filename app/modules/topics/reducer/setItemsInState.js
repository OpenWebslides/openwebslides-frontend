// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setItemsInState = (state: m.TopicsState, action: a.SetItemsInStateAction): m.TopicsState => {
  const newTopics = {};

  if (action.payload.items) {
    action.payload.items.forEach((item: m.Topic): void => {
      newTopics[item.id] = item;
    });
  }

  return {
    byId: newTopics,
  };
};

export default setItemsInState;
