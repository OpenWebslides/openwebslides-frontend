// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPost = (
  email: string,
  name: string,
  password: string,
  tosAccepted: boolean,
  age: number,
  gender: m.GenderType,
  role: m.RoleType,
  country: m.CountryType,
): a.ApiPostAction => {
  return {
    type: a.API_POST,
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

export default apiPost;
