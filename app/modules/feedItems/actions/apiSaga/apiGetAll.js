// @flow

import * as a from '../../actionTypes';

const apiGetAll = (): a.ApiGetAllAction => {
  return {
    type: a.API_GET_ALL,
    payload: {},
  };
};

export default apiGetAll;
