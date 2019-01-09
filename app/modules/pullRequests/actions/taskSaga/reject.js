// @flow

import * as a from '../../actionTypes';

const reject = (
  id: string,
  feedback: ?string,
): a.RejectAction => {
  return {
    type: a.REJECT,
    payload: {
      id,
      feedback,
    },
  };
};

export default reject;
