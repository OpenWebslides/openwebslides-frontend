// @flow

import type { Identifier } from 'types/model';
import * as t from '../actionTypes';

const removeFromState = (
  id: Identifier,
  context: ?t.ActionPayloadReducerContext,
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
