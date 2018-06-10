// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import type { VerticalContext } from '../model';

const removeFromState = (
  id: Identifier,
  context: ?VerticalContext,
): t.RemoveFromStateAction => {
  return {
    type: t.REMOVE_FROM_STATE,
    payload: {
      id,
      context,
    },
  };
};

export default removeFromState;
