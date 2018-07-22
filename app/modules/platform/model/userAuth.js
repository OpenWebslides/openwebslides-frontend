// @flow

import type { Identifier } from 'types/model';

export type UserAuth = {|
  +userId: Identifier,
  +apiToken: string,
|};
