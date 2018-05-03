// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import saga from './saga';

import type { Event, FeedState } from './model';

const feedItems = {
  actions,
  components,
  model,
  reducer,
  saga,
  selectors,
};

export type { Event, FeedState };
export default feedItems;
