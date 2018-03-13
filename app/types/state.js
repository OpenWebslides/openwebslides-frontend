// @flow

import type { TopicsState } from 'modules/topics';
import type { ContentItemsState } from 'modules/content-items';

export type State = {
  +modules: {
    +topics: TopicsState,
    +contentItems: ContentItemsState,
  },
  +error: {},
};
