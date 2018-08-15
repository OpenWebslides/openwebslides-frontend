// @flow

import * as a from '../../actionTypes';

const removeTopic = (id: string, topicId: string): a.RemoveTopicAction => {
  return {
    type: a.REMOVE_TOPIC,
    payload: {
      id,
      topicId,
    },
  };
};

export default removeTopic;
