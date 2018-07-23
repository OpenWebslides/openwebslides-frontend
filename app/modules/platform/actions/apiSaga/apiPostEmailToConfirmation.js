// @flow

import * as a from '../../actionTypes';

const apiPostEmailToConfirmation = (email: string): a.ApiPostEmailToConfirmationAction => {
  return {
    type: a.API_POST_EMAIL_TO_CONFIRMATION,
    payload: {
      email,
    },
  };
};

export default apiPostEmailToConfirmation;
