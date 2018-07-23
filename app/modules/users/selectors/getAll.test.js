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
  let dummyEmptyState: any;

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
    dummyEmptyState = { modules: { users: { byId: {} } } };
  });

  it(`returns an array containing all the users in the state, when there are users in the state`, (): void => {
    expect(selectors.getAll(dummyState)).toEqual([dummyUser1, dummyUser2, dummyUser3]);
  });

  it(`returns an empty array, when there are no users in the state`, (): void => {
    expect(selectors.getAll(dummyEmptyState)).toEqual([]);
  });

});
