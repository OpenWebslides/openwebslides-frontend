// @flow

import * as a from '../../actionTypes';

const getAllByUserId = (
  userId: string,
): a.GetAllByUserIdAction => {
  return {
    type: a.GET_ALL_BY_USERID,
    payload: {
      userId,
    },
  };
};

export default getAllByUserId;
