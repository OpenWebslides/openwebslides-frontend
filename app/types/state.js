// @flow

import type { TopicsState } from 'modules/topics';
import contentItems from 'modules/contentItems';
import type { SidebarsState } from 'modules/sidebars';
import type { FeedState } from 'modules/feed';
import type { UsersState } from 'modules/users';
import type { AuthState } from 'modules/authentication';
import type { ApiRequestsStatusState } from 'modules/apiRequestsStatus';
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
    +apiRequestsStatus: ApiRequestsStatusState,
    +history: HistoryState,
  },
  +form: {},
  +error: {},
};
