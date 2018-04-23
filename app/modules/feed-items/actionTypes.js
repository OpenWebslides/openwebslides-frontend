// @flow

import type { Error } from 'types/error';
import type { FeedItemType } from './model';

export const ADD: 'feedItems/ADD' = 'feedItems/ADD';

export const ADD_ERROR: 'feedItems/ADD_ERROR' = 'feedItems/ADD_ERROR';

export const FETCH_FEED: 'feed/FETCH_FEED' = 'feed/FETCH_FEED';
export const FETCH_FEED_SUCCESS: 'feed/FETCH_FEED_SUCCESS' = 'feed/FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE: 'feed/FETCH_FEED_FAILURE' = 'feed/FETCH_FEED_FAILURE';

export type FetchAction = {
  type: typeof FETCH_FEED,
};

export type FetchSuccessAction = {
  type: typeof FETCH_FEED_SUCCESS,
  data: Array<FeedItemType>,
};

export type FetchFailureAction = {
  type: typeof FETCH_FEED_FAILURE,
  error: Error,
};

export type FeedAction =
  | FetchAction
  | FetchSuccessAction
  | FetchFailureAction;
