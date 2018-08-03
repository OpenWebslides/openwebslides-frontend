// @flow

import * as a from '../../actionTypes';

const apiGet = (id: string): a.ApiGetAction => {
  return {
    type: a.API_GET,
    payload: {
      id,
    },
  };
};

export default apiGet;
