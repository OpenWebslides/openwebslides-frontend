// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const update = (
  id: string,
  name: string,
  locale: string,
  alertEmails: boolean,
  age: number,
  gender: m.GenderType,
  role: m.RoleType,
  country: string,
): a.UpdateAction => {
  return {
    type: a.UPDATE,
    payload: {
      id,
      name,
      locale,
      alertEmails,
      age,
      gender,
      role,
      country,
    },
  };
};

export default update;
