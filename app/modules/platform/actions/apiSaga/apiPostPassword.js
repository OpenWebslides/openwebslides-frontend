// @flow

import * as t from '../../actionTypes';

const apiPostPassword = (email: string): t.ApiPostPasswordAction => {
  return {
    type: t.API_POST_PASSWORD,
    payload: {
      email,
    },
  };
};

export default apiPostPassword;
