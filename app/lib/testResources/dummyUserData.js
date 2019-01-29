// @flow

import users from 'modules/users';

export const user: users.model.User = {
  id: 'dummyUserId',
  name: 'Test Tester',
  email: 'test@test.be',
  gravatarHash: 'abcdefghij',
  locale: 'en',
  alertEmails: true,
  topicIds: [],
  age: 18,
  gender: users.model.genderTypes.MALE,
  role: users.model.roleTypes.LEARNER,
  country: 'BE',
};

export const user2: users.model.User = {
  id: 'dummyUser2Id',
  name: 'Lorem ipsum',
  email: null,
  gravatarHash: 'klmnopqrst',
  locale: 'en',
  alertEmails: true,
  topicIds: [],
  age: 18,
  gender: users.model.genderTypes.FEMALE,
  role: users.model.roleTypes.TEACHER,
  country: 'BE',
};

export const user3: users.model.User = {
  id: 'dummyUser3Id',
  name: 'Dummyuser',
  email: 'dummy.user@test.com',
  gravatarHash: 'uvwxyzabcd',
  locale: 'en',
  alertEmails: true,
  topicIds: [],
  age: 18,
  gender: users.model.genderTypes.OTHER,
  role: users.model.roleTypes.COTEACHER,
  country: 'BE',
};
