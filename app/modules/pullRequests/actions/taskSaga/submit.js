// @flow

import * as a from '../../actionTypes';

const submit = (message: string, topicId: string, userId: string): a.SubmitAction => {
  return {
    type: a.SUBMIT,
    payload: {
      message,
      topicId,
      userId,
    },
  };
};

export default submit;
