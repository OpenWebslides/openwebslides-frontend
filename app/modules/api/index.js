// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';

import type { ApiState } from './model';

const api = {
  actions,
  components,
  model,
  reducer,
  selectors,
};

export type { ApiState };

export default api;
