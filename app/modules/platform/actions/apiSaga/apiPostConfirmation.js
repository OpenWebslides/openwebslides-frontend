// @flow

import * as a from '../../actionTypes';

const apiPostConfirmation = (email: string): a.ApiPostConfirmationAction => {
  return {
    type: a.API_POST_CONFIRMATION,
    payload: {
      email,
    },
  };
};

export default apiPostConfirmation;
