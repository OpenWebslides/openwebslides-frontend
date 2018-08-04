// @flow

import * as a from '../../actionTypes';

const fetch = (id: string): a.FetchAction => {
  return {
    type: a.FETCH,
    payload: {
      id,
    },
  };
};

export default fetch;
