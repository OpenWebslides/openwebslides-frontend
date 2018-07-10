// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import type { VerticalContext } from '../model';

const move = (id: Identifier, nextContext: VerticalContext): t.MoveAction => {
  return {
    type: t.MOVE,
    payload: {
      id,
      nextContext,
    },
  };
};

export default move;
