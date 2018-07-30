// @flow

import generateRandomString from 'lib/generateRandomString';

const ID_LENGTH = 10;

const generateId = (): string => {
  return generateRandomString(ID_LENGTH);
};

export default generateId;
