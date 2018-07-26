// @flow

import users from 'modules/users';

export const user: users.model.User = {
  id: 'dummyUserId',
  name: 'Test Tester',
  email: 'test@test.be',
  gravatarHash: 'abcdefghij',
};

export const user2: users.model.User = {
  id: 'dummyUser2Id',
  name: 'Lorem ipsum',
  email: null,
  gravatarHash: 'klmnopqrst',
};

export const user3: users.model.User = {
  id: 'dummyUser3Id',
  name: 'Dummyuser',
  email: 'dummy.user@test.com',
  gravatarHash: 'uvwxyzabcd',
};
