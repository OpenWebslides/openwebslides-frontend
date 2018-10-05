// @flow

import * as a from '../../actionTypes';

const toggleContentFetchedInState = (id: string): a.ToggleContentFetchedInStateAction => {
  return {
    type: a.TOGGLE_CONTENT_FETCHED_IN_STATE,
    payload: {
      id,
    },
  };
};

export default toggleContentFetchedInState;
