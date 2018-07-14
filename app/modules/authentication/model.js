// @flow

import type { ApiToken } from 'lib/ApiRequest';
import type { User } from 'modules/users';

export type AuthState = {
  +authenticated: boolean,
  +account: ?User,
  +token: ?ApiToken,
};
