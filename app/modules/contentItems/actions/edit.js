// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const edit = (
  id: string,
  propsForType: $Shape<m.AllPropsForAllTypes>,
): a.EditAction => {
  return {
    type: a.EDIT,
    payload: {
      id,
      propsForType,
    },
  };
};

export default edit;
