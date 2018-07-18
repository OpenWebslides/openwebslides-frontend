// @flow

import * as userAuth from './userAuth';
import * as settings from './settings';

export type PlatformState = {|
  +userAuth: ?userAuth.UserAuth,
  +settings: settings.UserSettings,
|};

export * from './userAuth';
export * from './settings';
