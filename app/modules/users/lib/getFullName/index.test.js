// @flow

import * as m from '../../model';

import getFullName from '.';

describe(`getFullName`, (): void => {

  it(`returns the passed user's full name, when the passed user has both a first and an last name`, (): void => {
    const dummyUser: m.User = { id: 'dummyId', email: null, firstName: 'Test', lastName: 'Tester' };
    expect(getFullName(dummyUser)).toBe('Test Tester');
  });

  it(`returns the passed user's first name, when the passed user only has a first name`, (): void => {
    const dummyUser: m.User = { id: 'dummyId', email: null, firstName: 'Test', lastName: null };
    expect(getFullName(dummyUser)).toBe('Test');
  });

});
