// @flow

import type { Identifier } from 'types/model';
import * as t from '../actionTypes';

const edit = (
  id: Identifier,
  propsForType: t.ActionPayloadPropsForType,
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
