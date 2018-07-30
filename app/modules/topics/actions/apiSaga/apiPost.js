// @flow

import * as a from '../../actionTypes';

const apiPost = (
  userId: string,
  title: string,
  description: ?string,
): a.ApiPostTopicAction => {
  return {
    type: a.API_POST,
    payload: {
      userId,
      title,
      description,
    },
  };
};

export default apiPost;
