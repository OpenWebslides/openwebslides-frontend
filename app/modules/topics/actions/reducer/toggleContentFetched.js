// @flow

import * as a from '../../actionTypes';

const toggleContentFetched = (id: string): a.ToggleContentFetchedAction => {
  return {
    type: a.TOGGLE_CONTENT_FETCHED,
    payload: {
      id,
    },
  };
};

export default toggleContentFetched;
