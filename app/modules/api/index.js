// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import * as constants from './constants';
import reducer from './reducer';

import type { ApiState } from './model';

const api = {
  actions,
  constants,
  model,
  reducer,
  selectors,
};

export type { ApiState };

export default api;
