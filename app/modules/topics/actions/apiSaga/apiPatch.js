// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const apiPatch = (
  title: string,
  description: ?string,
): a.ApiPatchAction => {
  const validatedPayload = validate.stringProps(
    ['title'],
    ['description'],
    { title, description },
  );

  return {
    type: a.API_PATCH,
    payload: {
      ...validatedPayload,
    },
  };
};

export default apiPatch;
