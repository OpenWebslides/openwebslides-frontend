// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setMultipleInState = (
  feedItems: $ReadOnlyArray<m.FeedItem>,
): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      feedItems,
    },
  };
};

export default setMultipleInState;
