// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import * as constants from './constants';
import components from './components';
import reducer from './reducer';
import saga from './saga';

import type { User, UsersState } from './model';

const users = {
  actions,
  constants,
  model,
  components,
  reducer,
  selectors,
  saga,
};

export type { User, UsersState };
export default users;
