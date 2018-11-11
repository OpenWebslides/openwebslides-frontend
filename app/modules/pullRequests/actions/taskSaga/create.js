// @flow

import * as a from '../../actionTypes';

const create = (
  message: string,
  sourceTopicId: string,
  targetTopicId: string,
  userId: string,
): a.CreateAction => {
  return {
    type: a.CREATE,
    payload: {
      message,
      sourceTopicId,
      targetTopicId,
      userId,
    },
  };
};

export default create;
