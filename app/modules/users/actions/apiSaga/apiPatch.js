// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const apiPatch = (
  id: string,
  name: ?string,
  locale: ?string,
  alertEmails: ?boolean,
  currentPassword: ?string,
  password: ?string,
  age: ?number,
  gender: ?m.GenderType,
  role: ?m.RoleType,
  country: ?string,
  deviceType: ?m.DeviceType,
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
      age,
      gender,
      role,
      country,
      deviceType,
    },
  };
};

export default apiPatch;
