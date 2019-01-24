// @flow

import topics from 'modules/topics';

import Policy from '../Policy';

class TopicPolicy extends Policy<topics.model.Topic> {
  update(): boolean {
    return (
      this.record.userId === this.user.id
      || this.record.collaboratorUserIds.includes(this.user.id)
    );
  }
}

export default TopicPolicy;
