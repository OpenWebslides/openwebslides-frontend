// @flow

import {
  predicate,
} from './predicate';
import type {
  Predicate,
} from './predicate';

export type Event = {|
  +id: string,
  +userId: string,
  +topicId: string,
  +predicate: Predicate,
  +timestamp: number,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type FeedState = {
  +[eventId: string]: Event,
};

export {
  predicate,
};

export type {
  Predicate,
};
