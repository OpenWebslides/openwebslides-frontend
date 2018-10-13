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

  it(`returns the users' byId object, when there are users in the state`, (): void => {
    expect(selectors.getAllById(dummyState)).toBe(dummyUsersState.byId);
  });

  it(`returns an empty object, when there are no users in the state`, (): void => {
    expect(selectors.getAllById(dummyEmptyState)).toStrictEqual({});
  });

});
