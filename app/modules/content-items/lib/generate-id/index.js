// @flow

import type { Identifier } from 'types/model';
import generateRandomString from 'lib/generate-random-string';

// #TODO optimal id length / generation method?
const ID_LENGTH = 10;

const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};

export default generateId;
