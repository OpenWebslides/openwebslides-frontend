// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import * as constants from './constants';
import reducer from './reducer';
import components from './components';

import type { Sidebar, SidebarsState } from './model';

const sidebars = {
  actions,
  constants,
  components,
  model,
  reducer,
  selectors,
};

export type { Sidebar, SidebarsState };
export default sidebars;
