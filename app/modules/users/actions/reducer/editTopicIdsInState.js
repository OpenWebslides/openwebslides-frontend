// @flow

import * as a from '../../actionTypes';

const editTopicIdsInState = (
  id: string,
  topicIds: $ReadOnlyArray<string>,
): a.EditTopicIdsInStateAction => {
  return {
    type: a.EDIT_TOPIC_IDS_IN_STATE,
    payload: {
      id,
      topicIds,
    },
  };
};

export default editTopicIdsInState;
