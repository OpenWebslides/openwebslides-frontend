// @flow

import * as a from '../../actionTypes';

const fetchAll = (): a.FetchAllAction => {
  return {
    type: a.FETCH_ALL,
    payload: {},
  };
};

export default fetchAll;
