// @flow

import * as a from '../../actionTypes';

const apiPostEmailToPassword = (email: string): a.ApiPostEmailToPasswordAction => {
  return {
    type: a.API_POST_EMAIL_TO_PASSWORD,
    payload: {
      email,
    },
  };
};

export default apiPostEmailToPassword;
