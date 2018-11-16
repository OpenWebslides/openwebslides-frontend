// @flow

import * as a from '../../actionTypes';

const markAsReadInState = (
  id: string,
): a.MarkAsReadInStateAction => {
  return {
    type: a.MARK_AS_READ_IN_STATE,
    payload: {
      id,
    },
  };
};

export default markAsReadInState;
