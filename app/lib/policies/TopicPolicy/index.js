// @flow

import pundit from 'pundit';

import topics from 'modules/topics';
import users from 'modules/users';

const TopicPolicy = pundit({
  update: (user: users.model.User, record: topics.model.Topic): boolean => {
    return (record.userId === user.id || record.collaboratorUserIds.includes(user.id));
  },
});

export default TopicPolicy;
