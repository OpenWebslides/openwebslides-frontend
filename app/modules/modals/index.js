// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import reducer from './reducer';
import components from './components';

import type { ModalsState } from './model';

const modals = {
  actions,
  components,
  model,
  reducer,
  selectors,
};


export type { ModalsState };
export default modals;
