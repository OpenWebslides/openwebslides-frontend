// @flow

import * as a from '../../actionTypes';

const signin = (email: string, password: string): a.SigninAction => {
  return {
    type: a.SIGNIN,
    payload: {
      email,
      password,
    },
  };
};

export default signin;
