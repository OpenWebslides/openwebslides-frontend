// @flow

import type { Identifier } from 'types/model';

export type UserType = {
  +id: Identifier,
  +firstName: string,
  +lastName: ?string,
  +email: ?string,
  +password: ?string,
};

export type UsersState = {
  +[userId: Identifier]: UserType,
};
