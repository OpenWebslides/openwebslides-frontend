// @flow

import generateRandomString from 'lib/generate-random-string';

const ID_LENGTH = 20;

const generateId = (): string => {
  return generateRandomString(ID_LENGTH);
};

export default generateId;
