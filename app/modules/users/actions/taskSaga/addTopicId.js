// @flow

import * as a from '../../actionTypes';

const addTopicId = (id: string, topicId: string): a.AddTopicIdAction => {
  return {
    type: a.ADD_TOPIC_ID,
    payload: {
      id,
      topicId,
    },
  };
};

export default addTopicId;
