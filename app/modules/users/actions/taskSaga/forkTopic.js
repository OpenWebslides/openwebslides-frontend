// @flow

import * as a from '../../actionTypes';

const forkTopic = (id: string, topicId: string): a.ForkTopicAction => {
  return {
    type: a.FORK_TOPIC,
    payload: {
      id,
      topicId,
    },
  };
};

export default forkTopic;
