// @flow

import * as a from '../../actionTypes';

const setPending = (id: string): a.SetPendingAction => {
  return {
    type: a.SET_PENDING,
    payload: {
      id,
    },
  };
};

export default setPending;
