// @flow

import * as a from '../../actionTypes';

const apiPatch = (
  id: string,
  name: ?string,
  locale: ?string,
  alertEmails: ?boolean,
  currentPassword: ?string,
  password: ?string,
  token: string,
): a.ApiPatchAction => {
  return {
    type: a.API_PATCH,
    payload: {
      id,
      name,
      locale,
      alertEmails,
      currentPassword,
      password,
      token,
    },
  };
};

export default apiPatch;
