// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const apiPost = (
  title: string,
  description: ?string,
  rootContentItemId: string,
  userId: string,
): a.ApiPostAction => {
  const validatedPayload = validate.stringProps(
    ['title', 'rootContentItemId'],
    ['description'],
    { title, description, rootContentItemId, userId },
  );

  return {
    type: a.API_POST,
    payload: {
      ...validatedPayload,
    },
  };
};

export default apiPost;
