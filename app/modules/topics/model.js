// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

const ID_LENGTH = 10;

export type Topic = {
  +id: Identifier,
  +userId: Identifier,
  +title: string,
  +description: ?string,
  +rootContentItemId: Identifier,
};

export type TopicsById = {
  +[topicId: Identifier]: Topic,
};

export type TopicsState = {
  +byId: TopicsById,
};

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};
