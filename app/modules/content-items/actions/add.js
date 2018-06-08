// @flow

import * as t from '../actionTypes';
import type { ContentItemType, Context } from '../model';

const add = (
  type: ContentItemType,
  context: ?Context,
  propsForType: t.ActionPayloadPropsForType,
): t.AddAction => {
  return {
    type: t.ADD,
    payload: {
      type,
      context,
      propsForType,
    },
  };
};

export default add;
