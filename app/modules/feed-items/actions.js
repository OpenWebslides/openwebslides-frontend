// @flow

import * as t from './actionTypes';

export const fetch = (): t.FetchAction => {
  return {
    type: t.FETCH_FEED,
  };
}
