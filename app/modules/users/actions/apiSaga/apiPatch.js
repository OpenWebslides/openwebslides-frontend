// @flow

import * as a from '../../actionTypes';

const apiPatch = (
  id: string,
  name: ?string,
  locale: ?string,
  alertEmails: ?boolean,
  currentPassword: ?string,
  password: ?string,
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
    },
  };
};

export default apiPatch;
