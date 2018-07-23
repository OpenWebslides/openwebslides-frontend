// @flow

import users from 'modules/users';

const { model } = users;

export const user: $Exact<model.User> = {
  id: 'dummyUserId',
  firstName: 'Test',
  lastName: 'Tester',
  email: 'test@test.be',
};

export const user2: $Exact<model.User> = {
  id: 'dummyUser2Id',
  firstName: 'Lorem',
  lastName: 'Ipsum',
  email: null,
};

export const user3: $Exact<model.User> = {
  id: 'dummyUser3Id',
  firstName: 'Dummy',
  lastName: null,
  email: 'dummy.user@test.com',
};
