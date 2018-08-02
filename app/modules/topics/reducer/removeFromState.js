// @flow

import _ from 'lodash';

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const removeFromState = (state: m.TopicsState, action: a.RemoveFromStateAction): m.TopicsState => {
  const { id } = action.payload;
  if (state.byId[id] == null) throw new ObjectNotFoundError(`topics:topic`, id);

  return {
    ...state,
    byId: _.omit(state.byId, id),
  };
};

export default removeFromState;
