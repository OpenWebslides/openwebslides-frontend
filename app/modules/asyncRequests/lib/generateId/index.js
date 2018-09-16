// @flow

import generateRandomString from 'lib/generateRandomString';

const RANDOM_ID_LENGTH = 20;

// Note: we include the action type in the random id for easier debugging.
const generateId = (actionType: string): string => {
  return `${actionType}___${generateRandomString(RANDOM_ID_LENGTH)}`;
};

export default generateId;
