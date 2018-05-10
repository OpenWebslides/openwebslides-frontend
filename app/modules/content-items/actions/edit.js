// @flow

import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import type { ContentItemType } from '../model';

const edit = (
  id: Identifier,
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.EditAction => {
  return {
    type: t.EDIT,
    payload: {
      id,
      type,
      props,
    },
  };
};

export default edit;
