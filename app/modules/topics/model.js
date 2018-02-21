// @flow
/* eslint-disable import/prefer-default-export */

import generateRandomString from 'lib/generate-random-string';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

export type Topic = {
  +id: string,
  +title: string,
  +description: string,
};

export const generateId = (): string => {
  return generateRandomString(ID_LENGTH);
};
