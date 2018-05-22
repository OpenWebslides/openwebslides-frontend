// @flow

import type { Identifier } from 'types/model';
import * as t from '../actionTypes';

const edit = (
  id: Identifier,
  propsForType: t.ActionPayloadPropsForType,
  isEditing: boolean = false,
): t.EditAction => {
  return {
    type: t.EDIT,
    payload: {
      id,
      isEditing,
      propsForType,
    },
  };
};

export default edit;
