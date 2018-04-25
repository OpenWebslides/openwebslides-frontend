// @flow

import type { User } from 'modules/users';

export type AuthState = {
  +authenticated: boolean,
  +account: ?User,
  +token: ?string,
};
