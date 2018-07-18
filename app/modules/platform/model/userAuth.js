// @flow

import type { Identifier } from 'types/model';
import type { ApiToken } from 'lib/ApiRequest';

export type UserAuth = {|
  +userId: Identifier,
  +apiToken: ApiToken,
|};
