// @flow

import * as t from '../actionTypes';

const setPending = (requestId: string): t.SetPendingAction => {
  return {
    type: t.SET_PENDING,
    payload: {
      requestId,
    },
  };
};

export default setPending;
