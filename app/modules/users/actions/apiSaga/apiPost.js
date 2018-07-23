// @flow

import * as a from '../../actionTypes';

const apiPost = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): a.ApiPostAction => {
  return {
    type: a.API_POST,
    payload: {
      email,
      firstName,
      lastName,
      password,
      tosAccepted,
    },
  };
};

export default apiPost;
