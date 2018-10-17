// @flow

import actions from './actions';
import components from './components';
import lib from './lib';
import * as model from './model';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';

const asyncRequests = {
  actions,
  components,
  lib,
  model,
  reducer,
  saga,
  selectors,
};

export default asyncRequests;
