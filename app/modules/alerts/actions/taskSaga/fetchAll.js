// @flow

import * as a from '../../actionTypes';

const fetchAll = (userId: string): a.FetchAllAction => {
  return {
    type: a.FETCH_ALL,
    payload: {
      userId,
    },
  };
};

export default fetchAll;
