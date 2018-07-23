// @flow

import * as a from '../actionTypes';

const remove = (id: string): a.RemoveAction => {
  return {
    type: a.REMOVE,
    payload: {
      id,
    },
  };
};

export default remove;
