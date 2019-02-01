// @flow

import { dummyUserData, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import Policy from '.';

describe(`Policy`, (): void => {

  let dummyUser: users.model.User;
  let dummyRecord: topics.model.Topic;

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
    dummyRecord = dummyTopicData.topic;
  });

  it(`defines a user and a record`, (): void => {
    const policy = new Policy(dummyUser, dummyRecord);

    expect(policy.user).toBe(dummyUser);
    expect(policy.record).toBe(dummyRecord);
  });

});
