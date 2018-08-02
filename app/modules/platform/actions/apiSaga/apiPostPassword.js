// @flow

import * as a from '../../actionTypes';

const apiPostPassword = (email: string): a.ApiPostPasswordAction => {
  return {
    type: a.API_POST_PASSWORD,
    payload: {
      email,
    },
  };
};

export default apiPostPassword;
