// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const apiPost = (
  message: string,
  topicId: string,
  userId: string,
): a.ApiPostAction => {
  const validatedPayload = validate.stringProps(
    ['message', 'topicId', 'userId'],
    [],
    { message, topicId, userId },
  );

  return {
    type: a.API_POST,
    payload: {
      ...validatedPayload,
    },
  };
};

export default apiPost;
