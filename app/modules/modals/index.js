// @flow

import * as actions from './actions';
import * as model from './model';
import reducer from './reducer';

import type { ModalsState } from './model';

const modals = {
  actions,
  model,
  reducer,
};


export type { ModalsState };
export default modals;
