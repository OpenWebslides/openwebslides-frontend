// @flow

import * as a from '../actionTypes';
import type { ContentItem } from '../model';

const setMultipleInState = (
  contentItems: Array<ContentItem>,
): a.SetMultipleInStateAction => {
  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      contentItems,
    },
  };
};

export default setMultipleInState;
