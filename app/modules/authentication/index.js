// @flow

// import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import saga from './saga';

import type { AuthState } from './model';

const authentication = {
  // actions,
  model,
  selectors,
  components,
  reducer,
  saga,
};

export type { AuthState };
export default authentication;
