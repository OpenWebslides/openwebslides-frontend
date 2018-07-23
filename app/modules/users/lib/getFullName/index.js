// @flow

import * as m from '../../model';

const getFullName = (user: m.User): string => {
  if (user.lastName) return `${user.firstName} ${user.lastName}`;
  else return user.firstName;
};

export default getFullName;
