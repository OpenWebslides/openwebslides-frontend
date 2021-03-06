// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setMultipleInState = (
  pullRequests: $ReadOnlyArray<m.PullRequest>,
): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      pullRequests,
    },
  };
};

export default setMultipleInState;
