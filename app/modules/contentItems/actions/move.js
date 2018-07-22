// @flow

import * as a from '../actionTypes';
import type { VerticalContext } from '../model';

const move = (id: string, nextContext: VerticalContext): a.MoveAction => {
  return {
    type: a.MOVE,
    payload: {
      id,
      nextContext,
    },
  };
};

export default move;
