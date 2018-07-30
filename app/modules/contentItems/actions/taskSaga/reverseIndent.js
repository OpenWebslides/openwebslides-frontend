// @flow

import * as a from '../../actionTypes';

const reverseIndent = (id: string): a.ReverseIndentAction => {
  return {
    type: a.REVERSE_INDENT,
    payload: {
      id,
    },
  };
};

export default reverseIndent;
