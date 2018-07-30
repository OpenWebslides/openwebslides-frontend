// @flow

import * as a from '../../actionTypes';

const apiGetAllByUserId = (
  userId: string,
): a.ApiGetAllTopicsByUserIdAction => {
  return {
    type: a.API_GET_ALL_BY_USERID,
    payload: {
      userId,
    },
  };
};

export default apiGetAllByUserId;
