// @flow

import * as t from '../actionTypes';

const toggleEditing = (
  id: string,
  isEditing: ?boolean = null,
): t.ToggleEditingAction => {
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
    type: t.TOGGLE_EDITING,
    payload,
  };
};

export default toggleEditing;
