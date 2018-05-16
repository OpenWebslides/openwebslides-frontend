// @flow

import * as t from '../actionTypes';
import type { ContentItemType } from '../model';

const add = (
  type: ContentItemType,
  propsForType: t.ActionPayloadPropsForType,
): t.AddAction => {
  return {
    type: t.ADD,
    payload: {
      type,
      propsForType,
    },
  };
};

export default add;
