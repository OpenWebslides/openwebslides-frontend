// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import type { AllPropsForAllTypes } from '../model';

const edit = (
  id: Identifier,
  propsForType: $Shape<AllPropsForAllTypes>,
): t.EditAction => {
  return {
    type: t.EDIT,
    payload: {
      id,
      propsForType,
    },
  };
};

export default edit;
