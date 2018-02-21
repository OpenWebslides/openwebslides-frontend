// @flow
/**
 * Generates a random string of the given length.
 */

const generateRandomStringOfVariableLength = (): string => {
  // Based on: https://gist.github.com/gordonbrander/2230317
  return Math.random().toString(36).substr(2);
};

const generateRandomString = (length: number): string => {
  let randomId: string = '';

  // Keep adding random strings until the lengt of randomId is greater than or equal to $length
  while (randomId.length < length) {
    randomId += generateRandomStringOfVariableLength();
  }

  // Take a substring of the exact $length
  return randomId.substr(0, length);
};

export default generateRandomString;
