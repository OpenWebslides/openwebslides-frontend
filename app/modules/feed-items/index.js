// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import saga from './saga';

import type { FeedItemType, FeedItemsState } from './model';

const feedItems = {
  actions,
  components,
  model,
  reducer,
  saga,
  selectors,
};

export type { FeedItemType, FeedItemsState };
export default feedItems;
