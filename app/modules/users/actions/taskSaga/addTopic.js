// @flow

import * as a from '../../actionTypes';

const addTopic = (id: string, title: string, description: ?string = null): a.AddTopicAction => {
  return {
    type: a.ADD_TOPIC,
    payload: {
      id,
      title,
      description,
    },
  };
};

export default addTopic;
