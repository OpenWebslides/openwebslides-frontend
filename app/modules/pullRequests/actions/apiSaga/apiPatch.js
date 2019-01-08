// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

const apiPatch = (
  id: string,
  stateEvent: string,
  feedback: ?string,
): a.ApiPatchAction => {
  const validatedPayload = validate.stringProps(
    ['stateEvent'],
    ['feedback'],
    { stateEvent, feedback },
  );

  return {
    type: a.API_PATCH,
    payload: {
      ...validatedPayload,
      id,
    },
  };
};

export default apiPatch;
