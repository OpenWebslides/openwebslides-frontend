// @flow

// import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';

import type { Account, AuthState } from './model';

const authentication = {
  // actions,
  model,
  selectors,
  components,
  reducer,
};

export type { Account, AuthState };
export default authentication;
