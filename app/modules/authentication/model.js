// @flow

import type { UserType } from 'modules/users';

export type AuthState = {
  +authenticated: boolean,
  +account: ?UserType,
  +token: ?string,
};
