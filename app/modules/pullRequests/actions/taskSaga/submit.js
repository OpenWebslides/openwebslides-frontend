// @flow

import * as a from '../../actionTypes';

const submit = (
  message: string,
  sourceTopicId: string,
  targetTopicId: string,
  userId: string,
): a.SubmitAction => {
  return {
    type: a.SUBMIT,
    payload: {
      message,
      sourceTopicId,
      targetTopicId,
      userId,
    },
  };
};

export default submit;
