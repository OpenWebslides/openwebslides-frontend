// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';

import type { Topic, TopicsById, TopicsState } from './model';

const topics = {
  actions,
  components,
  model,
  reducer,
  selectors,
};

export type { Topic, TopicsById, TopicsState };
export default topics;
