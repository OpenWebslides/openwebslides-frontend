// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getUserAuth = (state: State): ?m.UserAuth => {
  return state.modules.platform.userAuth;
};

export default getUserAuth;
