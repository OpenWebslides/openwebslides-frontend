// @flow

import * as t from '../actionTypes';
import type { VerticalContext } from '../model';

const moveInState = (
  id: string,
  nextContext: VerticalContext,
): t.MoveInStateAction => {
  return {
    type: t.MOVE_IN_STATE,
    payload: {
      id,
      nextContext,
    },
  };
};

export default moveInState;
