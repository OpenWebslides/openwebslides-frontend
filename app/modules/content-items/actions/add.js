// @flow

import * as t from '../actionTypes';
import type { ContentItemType, AllPropsForAllTypes, Context } from '../model';

const add = (
  type: ContentItemType,
  context: ?Context,
  propsForType: $Shape<AllPropsForAllTypes>,
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
