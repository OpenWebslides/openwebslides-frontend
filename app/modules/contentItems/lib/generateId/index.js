// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

const ID_LENGTH = 20;

const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};

export default generateId;
