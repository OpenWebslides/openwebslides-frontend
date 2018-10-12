// @flow

import generateRandomString from 'lib/generateRandomString';

import lib from '..';

jest.mock('lib/generateRandomString');

describe(`generateId`, (): void => {

  let dummyRandomString: string;

  beforeEach((): void => {
    dummyRandomString = 'abcdefghij';
  });

  it(`calls generateRandomString`, (): void => {
    (generateRandomString: any).mockReturnValue(dummyRandomString);
    expect(lib.generateId()).toBe(dummyRandomString);
  });

});
