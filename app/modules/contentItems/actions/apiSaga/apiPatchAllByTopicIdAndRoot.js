// @flow

import * as a from '../../actionTypes';

const apiPatchAllByTopicIdAndRoot = (
  topicId: string,
  rootContentItemId: string,
  message: string,
): a.ApiPatchAllByTopicIdAndRootAction => {
  return {
    type: a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT,
    payload: {
      topicId,
      rootContentItemId,
      message,
    },
  };
};

export default apiPatchAllByTopicIdAndRoot;
