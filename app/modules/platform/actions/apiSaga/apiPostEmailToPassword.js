// @flow

import * as t from '../../actionTypes';

const apiPostEmailToPassword = (email: string): t.ApiPostEmailToPasswordAction => {
  return {
    type: t.API_POST_EMAIL_TO_PASSWORD,
    payload: {
      email,
    },
  };
};

export default apiPostEmailToPassword;
