// @flow

import * as t from '../../actionTypes';

const signout = (): t.SignoutAction => {
  return { type: t.SIGNOUT };
};

export default signout;
