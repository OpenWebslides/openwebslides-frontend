// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import type { ApiRequestsStatusState } from './model';

const api = {
  actions,
  components,
  model,
  reducer,
  selectors,
};

export type { ApiRequestsStatusState };

export default api;
