// @flow

import generateRandomString from '..';

describe(`generateRandomString`, (): void => {

  it(`returns a string of the correct length`, (): void => {
    expect(generateRandomString(2).length).toBe(2);
    expect(generateRandomString(8).length).toBe(8);
    expect(generateRandomString(10).length).toBe(10);
    expect(generateRandomString(20).length).toBe(20);
    expect(generateRandomString(100).length).toBe(100);
  });

});
