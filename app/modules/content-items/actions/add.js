// @flow

import * as t from '../actionTypes';
import type { ContentItemType } from '../model';

const add = (
  type: ContentItemType,
  propsForType: t.ActionPayloadPropsForType,
  isEditing: boolean = false,
): t.AddAction => {
  return {
    type: t.ADD,
    payload: {
      type,
      isEditing,
      propsForType,
    },
  };
};

export default add;
