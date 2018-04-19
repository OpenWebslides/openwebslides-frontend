// @flow

import * as actions from './actions';
import * as model from './model';
import reducer from './reducer';
import components from './components';

import type { ModalsState } from './model';

const modals = {
  actions,
  components,
  model,
  reducer,
};


export type { ModalsState };
export default modals;
