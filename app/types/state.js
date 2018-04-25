// @flow

import type { TopicsState } from 'modules/topics';
import type { ContentItemsState } from 'modules/content-items';
import type { FeedItemsState } from 'modules/feed-items';
import type { UsersState } from 'modules/users';
import type { AuthState } from 'modules/authentication';
import type { ModalsState } from 'modules/modals';

export type ErrorState = {

};

export type State = {
  +modules: {
    +topics: TopicsState,
    +feedItems: FeedItemsState,
    +contentItems: ContentItemsState,
    +users: UsersState,
    +authentication: AuthState,
    +modals: ModalsState,
  },
  +form: {},
  +error: {},
};
