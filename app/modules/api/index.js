// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import * as constants from './constants';
import reducer from './reducer';

const api = {
  actions,
  constants,
  model,
  reducer,
  selectors,
};

export default api;
