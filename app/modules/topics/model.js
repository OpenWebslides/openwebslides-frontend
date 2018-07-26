// @flow

import generateRandomString from 'lib/generateRandomString';

const ID_LENGTH = 10;

export type Topic = {|
  +id: string,
  +userId: string,
  +title: string,
  +description: ?string,
  +rootContentItemId: string,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type TopicsById = {
  +[topicId: string]: Topic,
};

export type TopicsState = {|
  +byId: TopicsById,
|};

export const generateId = (): string => {
  return generateRandomString(ID_LENGTH);
};
