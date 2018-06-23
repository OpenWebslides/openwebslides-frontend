// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import type { VerticalContext } from '../model';

const moveInState = (
  id: Identifier,
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
