// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const editInState = (state: m.TopicsState, action: a.EditInStateAction): m.TopicsState => {
  const { id, title, description } = action.payload;
  let editedTopic: m.Topic = state.byId[id];

  if (title != null) editedTopic = { ...editedTopic, title };
  if (description != null) editedTopic = { ...editedTopic, description };

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: editedTopic,
    },
  };
};

export default editInState;
