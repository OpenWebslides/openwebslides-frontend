// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const add = (
  type: m.ContentItemType,
  context: ?m.Context,
  propsForType: $Shape<m.AllPropsForAllTypes>,
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
