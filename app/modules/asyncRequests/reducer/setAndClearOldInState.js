// @flow

import _ from 'lodash';

import * as a from '../actionTypes';
import * as m from '../model';

// Delete finished entries that are over a minute old,
// since there's no point in keeping logs that far back.
const OLD_AGE = 60000;

const setAndClearOldInState = (
  state: m.AsyncRequestsState,
  action: a.SetAndClearOldInStateAction,
): m.AsyncRequestsState => {
  const { asyncRequest } = action.payload;
  const newAsyncRequestsById = {};
  const minTimestamp = asyncRequest.timestamp - OLD_AGE;

  // Iterate over all asyncRequestsById
  // and only keep those with a timestamp more recent than minTimestamp.
  Object.keys(state.byId).forEach((id: string): void => {
    if (state.byId[id].timestamp > minTimestamp) newAsyncRequestsById[id] = state.byId[id];
  });

  if (
    // If the passed asyncRequest is a duplicate of one already in the state
    _.isEqual(asyncRequest, state.byId[asyncRequest.id])
    // and if no old requests have been deleted
    && Object.keys(newAsyncRequestsById).length === Object.keys(state.byId).length
  ) {
    // Return the original state object.
    return state;
  }
  else {
    // Set the passed asyncRequest in the state and return it.
    newAsyncRequestsById[asyncRequest.id] = asyncRequest;
    return {
      ...state,
      byId: newAsyncRequestsById,
    };
  }
};

export { OLD_AGE };
export default setAndClearOldInState;
