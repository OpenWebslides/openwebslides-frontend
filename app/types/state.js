// @flow

import type { TopicsState } from 'modules/topics';
import type { ContentItemsState } from 'modules/content-items';
import type { FeedItemsState } from 'modules/feed-items';

export type State = {
  +modules: {
    +topics: TopicsState,
    +feedItems: FeedItemsState,
    +contentItems: ContentItemsState,
  },
  +error: {},
};
