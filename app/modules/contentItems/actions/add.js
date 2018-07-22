// @flow

import * as a from '../actionTypes';
import type { ContentItemType, AllPropsForAllTypes, Context } from '../model';

const add = (
  type: ContentItemType,
  context: ?Context,
  propsForType: $Shape<AllPropsForAllTypes>,
): a.AddAction => {
  return {
    type: a.ADD,
    payload: {
      type,
      context,
      propsForType,
    },
  };
};

export default add;
