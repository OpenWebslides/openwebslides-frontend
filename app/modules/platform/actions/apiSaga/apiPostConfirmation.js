// @flow

import * as a from '../../actionTypes';

const apiPostConfirmation = (confirmationToken: string): a.ApiPostConfirmationAction => {
  return {
    type: a.API_POST_CONFIRMATION,
    payload: {
      confirmationToken,
    },
  };
};

export default apiPostConfirmation;
