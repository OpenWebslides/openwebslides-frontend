// @flow

import * as m from '../../model';
import * as a from '../../actionTypes';

const setMultipleInState = (
  topics: $ReadOnlyArray<m.Topic>,
): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      topics,
    },
  };
};

export default setMultipleInState;
