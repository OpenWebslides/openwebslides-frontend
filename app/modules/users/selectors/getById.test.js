// @flow

import { dummyUserData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

  let dummyUser1: m.User;
  let dummyUser2: m.User;
  let dummyUser3: m.User;

  let dummyUsersState: m.UsersState;
  let dummyState: any;

  beforeEach((): void => {
    dummyUser1 = { ...dummyUserData.user };
    dummyUser2 = { ...dummyUserData.user2 };
    dummyUser3 = { ...dummyUserData.user3 };
    dummyUsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
        [dummyUser2.id]: dummyUser2,
        [dummyUser3.id]: dummyUser3,
      },
    };
    dummyState = { modules: { users: dummyUsersState } };
  });

  it(`returns the user for the passed id, when the passed id exists in the state`, (): void => {
    expect(selectors.getById(dummyState, { id: dummyUser1.id })).toBe(dummyUser1);
  });

  it(`returns NULL, when the passed id does not exist in the state`, (): void => {
    expect(selectors.getById(dummyState, { id: 'DefinitelyNotValidId' })).toBeNull();
  });

});
