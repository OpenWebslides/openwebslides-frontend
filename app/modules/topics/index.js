// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import saga from './saga';

import type { Topic, TopicsById, TopicsState } from './model';

const topics = {
  actions,
  components,
  model,
  reducer,
  selectors,
  saga,
};

export type { Topic, TopicsById, TopicsState };
export default topics;
