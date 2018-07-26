// @flow

/**
 * Generates a random string of the given length.
 */

const generateRandomStringOfVariableLength = (): string => {
  // Based on: https://gist.github.com/gordonbrander/2230317
  return Math.random().toString(36).substr(2);
};

const generateRandomString = (length: number): string => {
  let randomString: string = '';

  // Keep adding random strings until the lengt of randomString is greater than or equal to $length
  while (randomString.length < length) {
    randomString += generateRandomStringOfVariableLength();
  }

  // Take a substring of the exact $length
  return randomString.substr(0, length);
};

export default generateRandomString;
