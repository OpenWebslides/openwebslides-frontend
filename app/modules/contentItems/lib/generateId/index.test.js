// @flow

import generateRandomString from 'lib/generate-random-string';

import generateId from '.';

jest.mock('lib/generate-random-string');

describe(`generateId`, (): void => {

  const dummyRandomString = 'abcdefghij';

  it(`calls generateRandomString`, (): void => {
    (generateRandomString: any).mockReturnValue(dummyRandomString);
    expect(generateId()).toEqual(dummyRandomString);
  });

});
