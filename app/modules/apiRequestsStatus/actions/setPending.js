// @flow

import * as a from '../actionTypes';

const setPending = (requestId: string): a.SetPendingAction => {
  return {
    type: a.SET_PENDING,
    payload: {
      requestId,
    },
  };
};

export default setPending;
