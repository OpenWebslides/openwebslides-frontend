// @flow

/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { type AsyncRequestsAction } from 'modules/asyncRequests/actionTypes';
import { type ContentItemsAction } from 'modules/contentItems/actionTypes';
import { type FeedItemsAction } from 'modules/feedItems/actionTypes';
import { type PlatformAction } from 'modules/platform/actionTypes';
import { type TopicsAction } from 'modules/topics/actionTypes';
import { type UsersAction } from 'modules/users/actionTypes';

export type Action =
  | AsyncRequestsAction
  | ContentItemsAction
  | FeedItemsAction
  | PlatformAction
  | TopicsAction
  | UsersAction;
