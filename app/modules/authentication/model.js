// @flow

import type { ApiToken } from 'lib/ApiRequest';
// import type { User } from 'modules/users';

export type AuthState = {
  +authenticated: boolean,
  // #TODO replace with userId to remove depentency on modules/users
  // eslint-disable-next-line flowtype/no-weak-types
  +account: any,
  +token: ?ApiToken,
};
