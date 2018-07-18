// @flow

import * as t from '../../actionTypes';

const signin = (email: string, password: string): t.SigninAction => {
  return {
    type: t.SIGNIN,
    payload: {
      email,
      password,
    },
  };
};

export default signin;
