// @flow

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const toggleContentFetchedInState = (
  state: m.TopicsState,
  action: a.ToggleContentFetchedInStateAction,
): m.TopicsState => {
  const { id } = action.payload;
  const topicToEdit = state.byId[id];
  if (topicToEdit == null) throw new ObjectNotFoundError(`topics:topic`, id);

  if (topicToEdit.isContentFetched) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: { ...topicToEdit, isContentFetched: true },
      },
    };
  }
};

export default toggleContentFetchedInState;
