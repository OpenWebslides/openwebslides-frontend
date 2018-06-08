// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import type { AncestorContext } from '../model';

const removeFromState = (
  id: Identifier,
  context: ?AncestorContext,
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
