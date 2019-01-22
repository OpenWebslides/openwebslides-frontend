// @flow

import * as a from '../../actionTypes';

const apiPatch = (
  id: string,
  title: ?string,
  description: ?string,
): a.ApiPatchAction => {
  return {
    type: a.API_PATCH,
    payload: {
      id,
      title,
      description,
    },
  };
};

export default apiPatch;
