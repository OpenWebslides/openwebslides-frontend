// @flow

import actions from './actions';
import components from './components';
import lib from './lib';
import * as model from './model';
import selectors from './selectors';

const asyncRequests = {
  actions,
  components,
  lib,
  model,
  selectors,
};

export default asyncRequests;
