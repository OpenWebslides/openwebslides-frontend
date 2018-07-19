// @flow

import * as t from '../../actionTypes';

const apiPostConfirmation = (email: string): t.ApiPostConfirmationAction => {
  return {
    type: t.API_POST_CONFIRMATION,
    payload: {
      email,
    },
  };
};

export default apiPostConfirmation;
