// @flow

import * as t from '../actionTypes';
import type { ContentItemType } from '../model';

const add = (
  type: ContentItemType,
  context: ?t.ActionPayloadSagaContext,
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
