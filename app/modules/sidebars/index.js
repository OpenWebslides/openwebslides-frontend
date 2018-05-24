// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import * as constants from './constants';
import reducer from './reducer';
import components from './components';

import type { SidebarName, SidebarsState } from './model';

const sidebars = {
  actions,
  constants,
  components,
  model,
  reducer,
  selectors,
};

export type { SidebarName, SidebarsState };
export default sidebars;
