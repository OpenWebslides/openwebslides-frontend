// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

const toggleEditing = (
  id: Identifier,
  isEditing: ?boolean = null,
): t.ToggleEditingAction => {
  let payload: { id: Identifier, isEditing?: boolean } = {
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
