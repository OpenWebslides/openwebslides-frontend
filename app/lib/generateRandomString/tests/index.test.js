// @flow

import generateRandomString from '..';

describe(`generateRandomString`, (): void => {

  it(`returns a string of the correct length`, (): void => {
    expect(generateRandomString(2)).toHaveLength(2);
    expect(generateRandomString(8)).toHaveLength(8);
    expect(generateRandomString(10)).toHaveLength(10);
    expect(generateRandomString(20)).toHaveLength(20);
    expect(generateRandomString(100)).toHaveLength(100);
  });

});
