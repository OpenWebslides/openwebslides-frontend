// @flow

import generateRandomString from 'lib/generateRandomString';

import generateId from '.';

jest.mock('lib/generateRandomString');

describe(`generateId`, (): void => {

  let dummyActionType: string;
  let dummyRandomString: string;

  beforeEach((): void => {
    dummyActionType = 'dummyActionType';
    dummyRandomString = 'abcdefghij';
  });

  it(`calls generateRandomString`, (): void => {
    (generateRandomString: any).mockReturnValue(dummyRandomString);
    expect(generateId(dummyActionType)).toEqual(`${dummyActionType}___${dummyRandomString}`);
  });

});
