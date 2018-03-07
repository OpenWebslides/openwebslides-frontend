// @flow

import * as actions from './actions';
import * as components from './components';
import * as model from './model';
import * as selectors from './selectors';
import reducer from './reducer';

import type { Topic, TopicsState } from './model';

const topics = {
  actions,
  components,
  model,
  reducer,
  selectors,
};

export type { Topic, TopicsState };
export default topics;
