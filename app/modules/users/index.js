// @flow

import * as model from './model';
import components from './components';

import type { User, UsersState } from './model';

const users = {
  model,
  components,
};

export type { User, UsersState };
export default users;
