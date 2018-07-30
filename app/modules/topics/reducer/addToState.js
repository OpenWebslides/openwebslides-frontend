// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const addToState = (state: m.TopicsState, action: a.AddToStateAction): m.TopicsState => {
  const { id } = action.payload;

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: action.payload,
    },
  };
};

export default addToState;
