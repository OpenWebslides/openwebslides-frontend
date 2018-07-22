// @flow

import * as a from '../../actionTypes';

const signup = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): a.SignupAction => {
  return {
    type: a.SIGNUP,
    payload: {
      email,
      firstName,
      lastName: lastName || undefined,
      password,
      tosAccepted,
    },
  };
};

export default signup;
