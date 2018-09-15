// @flow

/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

// AsyncRequests module
import { type AsyncRequestsAction } from 'modules/asyncRequests/actionTypes';
import { type AsyncRequestsState } from 'modules/asyncRequests/model';
// ContentItems module
import { type ContentItemsAction } from 'modules/contentItems/actionTypes';
import { type ContentItemsState } from 'modules/contentItems/model';
// FeedItems module
import { type FeedItemsAction } from 'modules/feedItems/actionTypes';
import { type FeedItemsState } from 'modules/feedItems/model';
// Platform module
import { type PlatformAction } from 'modules/platform/actionTypes';
import { type PlatformState } from 'modules/platform/model';
// Topics module
import { type TopicsAction } from 'modules/topics/actionTypes';
import { type TopicsState } from 'modules/topics/model';
// Users module
import { type UsersAction } from 'modules/users/actionTypes';
import { type UsersState } from 'modules/users/model';

// #TODO extract error functionality into module
import { type ErrorState } from './error';

export type ModulesAction =
  | AsyncRequestsAction
  | ContentItemsAction
  | FeedItemsAction
  | PlatformAction
  | TopicsAction
  | UsersAction;

export type ModulesState = {|
  +asyncRequests: AsyncRequestsState,
  +contentItems: ContentItemsState,
  +feedItems: FeedItemsState,
  +platform: PlatformState,
  +topics: TopicsState,
  +users: UsersState,
|};

export type AppState = {|
  +error: ErrorState,
  +form: {},
  +modules: ModulesState,
|};
