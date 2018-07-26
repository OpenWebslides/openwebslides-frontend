// @flow

/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { type ApiRequestsStatusState } from 'modules/apiRequestsStatus/model';
import { type ContentItemsState } from 'modules/contentItems/model';
import { type FeedState } from 'modules/feed/model';
import { type PlatformState } from 'modules/platform/model';
import { type TopicsState } from 'modules/topics/model';
import { type UsersState } from 'modules/users/model';

export type ErrorState = {||};

export type State = {|
  +modules: {
    +apiRequestsStatus: ApiRequestsStatusState,
    +contentItems: ContentItemsState,
    +feed: FeedState,
    +platform: PlatformState,
    +topics: TopicsState,
    +users: UsersState,
  },
  +form: {},
  +error: {},
|};
