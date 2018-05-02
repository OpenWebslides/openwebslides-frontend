// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

import {
  predicate,
} from './predicateTypes';

import type {
  Predicate,
} from './predicateTypes';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};

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

