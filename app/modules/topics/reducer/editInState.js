// @flow

import _ from 'lodash';

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const editInState = (state: m.TopicsState, action: a.EditInStateAction): m.TopicsState => {
  const { id, editedProps } = action.payload;
  if (state.byId[id] == null) throw new ObjectNotFoundError(`topics:topic`, id);

  const editedTopic: m.Topic = { ...state.byId[id], ...editedProps };

  if (_.isEqual(state.byId[id], editedTopic)) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: editedTopic,
      },
    };
  }
};

export default editInState;
