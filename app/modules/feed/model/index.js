// @flow

import type { Identifier } from 'types/model';

import {
  predicate,
} from './predicate';
import type {
  Predicate,
} from './predicate';

export type Event = {
  +id: Identifier,
  +userId: Identifier,
  +topicId: Identifier,
  +predicate: Predicate,
  +timestamp: number,
};

export type FeedState = {
  +[eventId: string]: Event,
};

export {
  predicate,
};

export type {
  Predicate,
};
