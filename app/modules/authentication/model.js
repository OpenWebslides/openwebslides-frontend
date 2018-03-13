// @flow
/* eslint-disable import/prefer-default-export */

import type { Identifier } from 'types/model';

export type Account = {
  +id: Identifier,
  +firstName: string,
  +lastName: string,
  +email: string,
};

export type AuthenticationState = {
  +account: Account,
};
