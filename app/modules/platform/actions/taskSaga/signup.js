// @flow

import * as t from '../../actionTypes';

const signup = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): t.SignupAction => {
  return {
    type: t.SIGNUP,
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
