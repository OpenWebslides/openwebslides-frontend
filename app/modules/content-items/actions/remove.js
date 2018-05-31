// @flow

import type { Identifier } from 'types/model';
import * as t from '../actionTypes';

const remove = (id: Identifier): t.RemoveAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
    },
  };
};

export default remove;
