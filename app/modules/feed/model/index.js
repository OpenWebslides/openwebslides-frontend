// @flow

import * as predicate from './predicate';

export type Event = {|
  +id: string,
  +userId: string,
  +topicId: string,
  +predicate: predicate.Predicate,
  +timestamp: number,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type FeedState = {
  +[eventId: string]: Event,
};

export * from './predicate';
