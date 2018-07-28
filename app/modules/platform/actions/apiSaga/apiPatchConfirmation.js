// @flow

import * as a from '../../actionTypes';

const apiPatchConfirmation = (confirmationToken: string): a.ApiPatchConfirmationAction => {
  return {
    type: a.API_PATCH_CONFIRMATION,
    payload: {
      confirmationToken,
    },
  };
};

export default apiPatchConfirmation;
