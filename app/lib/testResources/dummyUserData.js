// @flow

import users from 'modules/users';

const { model } = users;

export const user: $Exact<model.User> = {
  id: 'dummyUserId',
  firstName: 'Test',
  lastName: 'Tester',
  email: 'test@test.be',
};
