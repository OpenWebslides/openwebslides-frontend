// @flow

import * as t from '../actionTypes';

const reverseIndent = (id: string): t.ReverseIndentAction => {
  return {
    type: t.REVERSE_INDENT,
    payload: {
      id,
    },
  };
};

export default reverseIndent;
