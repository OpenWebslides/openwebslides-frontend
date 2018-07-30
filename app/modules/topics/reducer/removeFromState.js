// @flow

import _ from 'lodash';

import * as a from '../actionTypes';
import * as m from '../model';

const removeFromState = (state: m.TopicsState, action: a.RemoveFromStateAction): m.TopicsState => {
  const { id } = action.payload;

  return {
    ...state,
    byId: _.omit(state.byId, id),
  };
};

export default removeFromState;
