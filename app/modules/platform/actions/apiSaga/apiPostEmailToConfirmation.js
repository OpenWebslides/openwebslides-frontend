// @flow

import * as t from '../../actionTypes';

const apiPostEmailToConfirmation = (email: string): t.ApiPostEmailToConfirmationAction => {
  return {
    type: t.API_POST_EMAIL_TO_CONFIRMATION,
    payload: {
      email,
    },
  };
};

export default apiPostEmailToConfirmation;
