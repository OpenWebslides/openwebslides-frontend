// @flow

import * as t from '../actionTypes';

const remove = (id: string): t.RemoveAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
    },
  };
};

export default remove;
