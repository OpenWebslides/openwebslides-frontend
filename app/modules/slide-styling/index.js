// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import type { SlideStyling, SlideStylingById, SlideStylingState } from './model';

const slideStyling = {
  actions,
  components,
  model,
  reducer,
  selectors,
};

export type { SlideStyling, SlideStylingById, SlideStylingState };
export default slideStyling;
