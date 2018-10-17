// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const apiPatch = (
  id: string,
  title?: ?string,
  description?: ?string,
): a.ApiPatchAction => {
  const validatedPayload = validate.stringProps(
    [],
    ['title', 'description'],
    { title, description },
  );

  return {
    type: a.API_PATCH,
    payload: {
      id,
      ...validatedPayload,
    },
  };
};

export default apiPatch;
