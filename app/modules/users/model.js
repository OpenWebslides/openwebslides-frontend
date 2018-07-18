// @flow

import type { Identifier } from 'types/model';

export type User = {
  +id: Identifier,
  +firstName: string,
  +lastName?: ?string,
  +email?: string,
};

export type UsersState = {
  +[userId: Identifier]: User,
};

export const getName = (user: User): string => {
  if (user.lastName) return `${user.firstName} ${user.lastName}`;
  else return user.firstName;
};
