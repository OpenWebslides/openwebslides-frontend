// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  contentItems: $ReadOnlyArray<m.ContentItem>,
): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      contentItems,
    },
  };
};

export default setMultipleInState;
