// @flow

import { UnsupportedOperationError } from 'errors';

import * as a from '../actionTypes';

const switchEditingInState = (
  previousEditingItemId: ?string,
  nextEditingItemId: ?string,
): a.SwitchEditingInStateAction => {
  const newPreviousEditingItemId = (previousEditingItemId != null) ? previousEditingItemId : null;
  const newNextEditingItemId = (nextEditingItemId != null) ? nextEditingItemId : null;

  if (newPreviousEditingItemId == null && newNextEditingItemId == null) {
    throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);
  }

  return {
    type: a.SWITCH_EDITING_IN_STATE,
    payload: {
      previousEditingItemId: newPreviousEditingItemId,
      nextEditingItemId: newNextEditingItemId,
    },
  };
};

export default switchEditingInState;
