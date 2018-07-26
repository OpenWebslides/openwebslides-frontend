// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const moveInState = (
  id: string,
  nextContext: m.VerticalContext,
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
