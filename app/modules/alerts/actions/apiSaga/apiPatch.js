// @flow

import * as a from '../../actionTypes';

const apiPatch = (id: string, read: boolean): a.ApiPatchAction => {
  return {
    type: a.API_PATCH,
    payload: {
      id,
      read,
    },
  };
};

export default apiPatch;
