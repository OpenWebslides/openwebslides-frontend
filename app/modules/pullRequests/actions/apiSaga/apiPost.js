// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const apiPost = (
  message: string,
  sourceTopicId: string,
  targetTopicId: string,
  userId: string,
): a.ApiPostAction => {
  const validatedPayload = validate.stringProps(
    ['message'],
    [],
    { message, sourceTopicId, targetTopicId, userId },
  );

  return {
    type: a.API_POST,
    payload: {
      ...validatedPayload,
    },
  };
};

export default apiPost;
