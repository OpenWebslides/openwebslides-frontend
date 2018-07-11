// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

const reverseIndent = (id: Identifier): t.ReverseIndentAction => {
  return {
    type: t.REVERSE_INDENT,
    payload: {
      id,
    },
  };
};

export default reverseIndent;
