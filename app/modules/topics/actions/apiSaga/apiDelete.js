// @flow

import * as a from '../../actionTypes';

const apiDelete = (id: string): a.ApiDeleteAction => {
  return {
    type: a.API_DELETE,
    payload: {
      id,
    },
  };
};

export default apiDelete;
