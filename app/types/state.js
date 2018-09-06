// @flow

/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { type AsyncRequestsState } from 'modules/asyncRequests/model';
import { type ContentItemsState } from 'modules/contentItems/model';
import { type FeedItemsState } from 'modules/feedItems/model';
import { type PlatformState } from 'modules/platform/model';
import { type TopicsState } from 'modules/topics/model';
import { type UsersState } from 'modules/users/model';

export type ErrorState = {||};

export type State = {|
  +error: {},
  +form: {},
  +modules: {
    +asyncRequests: AsyncRequestsState,
    +contentItems: ContentItemsState,
    +feedItems: FeedItemsState,
    +platform: PlatformState,
    +topics: TopicsState,
    +users: UsersState,
  },
|};
