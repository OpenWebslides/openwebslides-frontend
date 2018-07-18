// @flow

import type { ApiRequestsStatusState } from 'modules/apiRequestsStatus';
import type { AuthState } from 'modules/authentication';
import contentItems from 'modules/contentItems';
import type { FeedState } from 'modules/feed';
import type { HistoryState } from 'modules/history';
import type { SidebarsState } from 'modules/sidebars';
import type { TopicsState } from 'modules/topics';
import type { UsersState } from 'modules/users';

export type ErrorState = {

};

export type State = {
  +modules: {
    +apiRequestsStatus: ApiRequestsStatusState,
    +authentication: AuthState,
    +contentItems: contentItems.model.ContentItemsState,
    +feed: FeedState,
    +history: HistoryState,
    +sidebars: SidebarsState,
    +topics: TopicsState,
    +users: UsersState,
  },
  +form: {},
  +error: {},
};
