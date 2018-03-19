// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

import {
  predicateTypes,
} from './predicateTypes';

import type {
  predicateType,
} from './predicateTypes';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};

export type FeedItem = {
  +id: Identifier,
  +userId: Identifier,
  +topicId: Identifier,
  +predicate: predicateType,
  +timestamp: number,
};

export type FeedItemsState = {
  +[feedItemId: string]: FeedItem,
};

export {
  predicateTypes,
};

export type {
  predicateType,
};

