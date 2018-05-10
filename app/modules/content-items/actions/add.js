// @flow

import * as t from '../actionTypes';
import type { ContentItemType } from '../model';

const add = (
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.AddAction => {
  return {
    type: t.ADD,
    payload: {
      type,
      props,
    },
  };
};

export default add;
