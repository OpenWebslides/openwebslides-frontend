// @flow

import users from 'modules/users';

class Policy<T> {
  user: users.model.User;

  record: T;

  constructor(user: users.model.User, record: T): void {
    this.user = user;
    this.record = record;
  }
}

export default Policy;
