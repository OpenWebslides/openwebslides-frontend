// @flow

import * as a from '../../actionTypes';

const removeTopicId = (id: string, topicId: string): a.RemoveTopicIdAction => {
  return {
    type: a.REMOVE_TOPIC_ID,
    payload: {
      id,
      topicId,
    },
  };
};

export default removeTopicId;
