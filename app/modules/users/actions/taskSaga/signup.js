// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const signup = (
  email: string,
  name: string,
  password: string,
  tosAccepted: boolean,
  age: number,
  gender: m.GenderType,
  role: m.RoleType,
  country: m.CountryType,
): a.SignupAction => {
  return {
    type: a.SIGNUP,
    payload: {
      email,
      name,
      password,
      tosAccepted,
      age,
      gender,
      role,
      country,
    },
  };
};

export default signup;
