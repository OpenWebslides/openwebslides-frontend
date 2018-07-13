// @flow

import { UnsupportedOperationError } from 'errors';
import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

const switchEditingInState = (
  previousEditingItemId: ?Identifier,
  nextEditingItemId: ?Identifier,
): t.SwitchEditingInStateAction => {
  const newPreviousEditingItemId = previousEditingItemId || null;
  const newNextEditingItemId = nextEditingItemId || null;

  if (newPreviousEditingItemId == null && newNextEditingItemId == null) {
    throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);
  }

  return {
    type: t.SWITCH_EDITING_IN_STATE,
    payload: {
      previousEditingItemId: newPreviousEditingItemId,
      nextEditingItemId: newNextEditingItemId,
    },
  };
};

export default switchEditingInState;
