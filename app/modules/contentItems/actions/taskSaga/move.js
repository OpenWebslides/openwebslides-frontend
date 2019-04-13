// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const move = (id: string, nextContext: m.SuperContext): a.MoveAction => {
  return {
    type: a.MOVE,
    payload: {
      id,
      nextContext,
    },
  };
};

export default move;
