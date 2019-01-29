// @flow

import * as a from '../../actionTypes';

const apiPost = (
  email: string,
  name: string,
  password: string,
  tosAccepted: boolean,
): a.ApiPostAction => {
  return {
    type: a.API_POST,
    payload: {
      email,
      name,
      password,
      tosAccepted,
    },
  };
};

export default apiPost;
