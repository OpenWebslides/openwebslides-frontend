// @flow

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const setDirtyInState = (
  state: m.TopicsState,
  action: a.SetDirtyInStateAction,
): m.TopicsState => {
  const { id, dirty } = action.payload;
  const topicToEdit = state.byId[id];
  if (topicToEdit == null) throw new ObjectNotFoundError(`topics:topic`, id);

  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: { ...topicToEdit, isDirty: dirty },
      },
    };
  }
};

export default setDirtyInState;
