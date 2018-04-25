// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export type UserType = {
  +id: Identifier,
  +firstName: string,
  +lastName?: ?string,
  +email: string,
  +password?: string,
};

export type UsersState = {
  +[userId: Identifier]: UserType,
};

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};
