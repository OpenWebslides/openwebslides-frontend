// @flow

import * as t from '../../actionTypes';

const apiPostConfirmation = (confirmationToken: string): t.ApiPostConfirmationAction => {
  return {
    type: t.API_POST_CONFIRMATION,
    payload: {
      confirmationToken,
    },
  };
};

export default apiPostConfirmation;
