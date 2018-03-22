// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';

import type { User, UsersState } from './model';

const users = {
  actions,
  model,
  components,
  reducer,
  selectors,
};

export type { User, UsersState };
export default users;
