// @flow

import type { Error } from 'types/error';

export const ADD: 'feedItems/ADD' = 'feedItems/ADD';

export const ADD_ERROR: 'feedItems/ADD_ERROR' = 'feedItems/ADD_ERROR';

export type AddAction = {
  type: typeof ADD,
  payload: {
    id: string,
    userId: string,
    topicId: string,
    predicate: string,
    timestamp: number,
  },
};

export type AddErrorAction = {
  type: typeof ADD_ERROR,
  error: Error,
};

export type FeedAction =
  | AddAction
  | AddErrorAction;
