// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import type { Modal, ModalsState } from './model';

const modals = {
  actions,
  model,
  reducer,
  selectors,
  saga,
};


export type { Modal, ModalsState };
export default modals;
