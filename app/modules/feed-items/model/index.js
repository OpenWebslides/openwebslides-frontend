// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

import {
  predicateTypes,
} from './predicateTypes';

import type {
  PredicateType,
} from './predicateTypes';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};

export type FeedItemType = {
  +id: Identifier,
  +userId: Identifier,
  +topicId: Identifier,
  +predicate: PredicateType,
  +timestamp: number,
};

export type FeedItemsState = {
  +[feedItemId: string]: FeedItemType,
};

export {
  predicateTypes,
};

export type {
  PredicateType,
};

