// @flow

import * as a from '../../actionTypes';

const signup = (
  email: string,
  name: string,
  password: string,
  tosAccepted: boolean,
): a.SignupAction => {
  return {
    type: a.SIGNUP,
    payload: {
      email,
      name,
      password,
      tosAccepted,
    },
  };
};

export default signup;
