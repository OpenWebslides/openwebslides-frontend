// @flow

import * as a from '../../actionTypes';

const apiGetAllByTopicId = (topicId: string): a.ApiGetAllByTopicIdAction => {
  return {
    type: a.API_GET_ALL_BY_TOPIC_ID,
    payload: {
      topicId,
    },
  };
};

export default apiGetAllByTopicId;
