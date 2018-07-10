// @flow

import type { TopicsState } from 'modules/topics';
import contentItems from 'modules/contentItems';
import type { SidebarsState } from 'modules/sidebars';
import type { FeedState } from 'modules/feed';
import type { UsersState } from 'modules/users';
import type { AuthState } from 'modules/authentication';
import type { ApiState } from 'modules/api';
import type { HistoryState } from 'modules/history';

export type ErrorState = {

};

export type State = {
  +modules: {
    +topics: TopicsState,
    +feed: FeedState,
    +sidebars: SidebarsState,
    +contentItems: contentItems.model.ContentItemsState,
    +users: UsersState,
    +authentication: AuthState,
    +api: ApiState,
    +history: HistoryState,
  },
  +form: {},
  +error: {},
};
