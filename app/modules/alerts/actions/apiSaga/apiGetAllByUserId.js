// @flow

import * as a from '../../actionTypes';

const apiGetAllByUserId = (userId: string): a.ApiGetAllByUserIdAction => {
  return {
    type: a.API_GET_ALL_BY_USER_ID,
    payload: {
      userId,
    },
  };
};

export default apiGetAllByUserId;
