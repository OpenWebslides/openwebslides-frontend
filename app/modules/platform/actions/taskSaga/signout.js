// @flow

import * as a from '../../actionTypes';

const signout = (): a.SignoutAction => {
  return {
    type: a.SIGNOUT,
    payload: {},
  };
};

export default signout;
