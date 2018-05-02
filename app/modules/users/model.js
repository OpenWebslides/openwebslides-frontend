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
