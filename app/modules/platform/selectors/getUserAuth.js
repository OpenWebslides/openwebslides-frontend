// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getUserAuth = (state: AppState): ?m.UserAuth => {
  return state.modules.platform.userAuth;
};

export default getUserAuth;
