// @flow

import * as a from '../actionTypes';

const toggleEditing = (
  id: string,
  isEditing: ?boolean = null,
): a.ToggleEditingAction => {
  let payload: { id: string, isEditing?: boolean } = {
    id,
  };

  if (isEditing != null) {
    payload = {
      ...payload,
      isEditing,
    };
  }

  return {
    type: a.TOGGLE_EDITING,
    payload,
  };
};

export default toggleEditing;
