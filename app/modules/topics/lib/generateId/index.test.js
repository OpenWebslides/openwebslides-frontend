// @flow

import generateRandomString from 'lib/generateRandomString';

import generateId from '.';

jest.mock('lib/generateRandomString');

describe(`generateId`, (): void => {

  let dummyRandomString: string;

  beforeEach((): void => {
    dummyRandomString = 'abcdefghij';
  });

  it(`calls generateRandomString`, (): void => {
    (generateRandomString: any).mockReturnValue(dummyRandomString);
    expect(generateId()).toEqual(dummyRandomString);
  });

});
