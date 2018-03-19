// @flow

import * as actions from './actions';
import * as model from './model/index';
import components from './components';

import type { FeedItem, FeedItemsState } from './model/index';

const feedItems = {
  actions,
  components,
  model,
};

export type { FeedItem, FeedItemsState };
export default feedItems;
