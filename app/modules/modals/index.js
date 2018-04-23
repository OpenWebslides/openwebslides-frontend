// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import reducer from './reducer';

import type { Modal, ModalsState } from './model';

const modals = {
  actions,
  model,
  reducer,
  selectors,
};


export type { Modal, ModalsState };
export default modals;
