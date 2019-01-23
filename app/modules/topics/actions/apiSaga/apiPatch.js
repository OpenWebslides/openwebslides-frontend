// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPatch = (
  id: string,
  title: ?string,
  description: ?string,
  access: ?m.AccessType,
): a.ApiPatchAction => {
  return {
    type: a.API_PATCH,
    payload: {
      id,
      title,
      description,
      access,
    },
  };
};

export default apiPatch;
