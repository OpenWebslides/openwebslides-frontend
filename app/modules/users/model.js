// @flow
/* eslint-disable import/prefer-default-export */

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export type User = {
  +id: Identifier,
  +firstName: string,
  +lastName: ?string,
  +email: string,
  +password: string,
};

export type DisplayNameAndEmailType = {
  +displayName: string,
  +email: string,
};

export type UsersState = {
  +[userId: Identifier]: User,
};

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};
