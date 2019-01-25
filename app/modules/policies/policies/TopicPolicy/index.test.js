// @flow

import { dummyUserData, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import TopicPolicy from '.';

describe(`TopicPolicy`, (): void => {

  let dummyUser: users.model.User;
  let dummyRecord: topics.model.Topic;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user, id: 'dummyPolicyUser' };
    dummyRecord = { ...dummyTopicData.topic, userId: 'dummyRecordUser', collaboratorUserIds: [] };
  });

  describe(`update`, (): void => {

    it(`forbids a random user`, (): void => {
      const policy = new TopicPolicy(dummyUser, dummyRecord);

      expect(policy.update()).toBe(false);
    });

    it(`permits the topic owner`, (): void => {
      const policy = new TopicPolicy(dummyUser, { ...dummyRecord, userId: dummyUser.id });

      expect(policy.update()).toBe(true);
    });

    it(`permits a topic collaborator`, (): void => {
      const policy = new TopicPolicy(dummyUser, { ...dummyRecord, collaboratorUserIds: [dummyUser.id] });

      expect(policy.update()).toBe(true);
    });

  });

});
