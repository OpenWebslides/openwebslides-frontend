// @flow

import * as a from '../actionTypes';
import type { AllPropsForAllTypes } from '../model';

const edit = (
  id: string,
  propsForType: $Shape<AllPropsForAllTypes>,
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
