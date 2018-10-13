// @flow

import * as a from '../../actionTypes';

const create = (
  email: string,
  name: string,
  password: string,
  tosAccepted: boolean,
): a.CreateAction => {
  return {
    type: a.CREATE,
    payload: {
      email,
      name,
      password,
      tosAccepted,
    },
  };
};

export default create;
