// @flow
/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { type ModuleAction as ApiRequestsStatusAction } from 'modules/apiRequestsStatus/actionTypes';
import { type ModuleAction as ContentItemsAction } from 'modules/contentItems/actionTypes';
import { type ModuleAction as FeedAction } from 'modules/feed/actionTypes';
import { type ModuleAction as PlatformAction } from 'modules/platform/actionTypes';
import { type ModuleAction as TopicsAction } from 'modules/topics/actionTypes';
import { type ModuleAction as UsersAction } from 'modules/users/actionTypes';

export type Action =
  | ApiRequestsStatusAction
  | ContentItemsAction
  | FeedAction
  | PlatformAction
  | TopicsAction
  | UsersAction;
