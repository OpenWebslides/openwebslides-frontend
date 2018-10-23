// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.PullRequestsState,
  action: a.SetMultipleInStateAction,
): m.PullRequestsState => {
  const { pullRequests } = action.payload;

  if (pullRequests.length === 0) {
    return state;
  }
  else {
    const newById = { ...state.byId };

    pullRequests.forEach((pullRequest: m.PullRequest): void => {
      newById[pullRequest.id] = pullRequest;
    });

    return {
      ...state,
      byId: newById,
    };
  }
};

export default setMultipleInState;
