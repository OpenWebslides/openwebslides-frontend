// @flow

import * as a from '../actionTypes';
import type { VerticalContext } from '../model';

const moveInState = (
  id: string,
  nextContext: VerticalContext,
): a.MoveInStateAction => {
  return {
    type: a.MOVE_IN_STATE,
    payload: {
      id,
      nextContext,
    },
  };
};

export default moveInState;
