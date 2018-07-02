// @flow

import * as t from '../actionTypes';
import type { ContentItem } from '../model';

const setMultipleInState = (
  contentItems: Array<ContentItem>,
): t.SetMultipleInStateAction => {
  return {
    type: t.SET_MULTIPLE_IN_STATE,
    payload: {
      contentItems,
    },
  };
};

export default setMultipleInState;
