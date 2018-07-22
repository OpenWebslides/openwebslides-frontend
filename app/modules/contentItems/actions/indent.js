// @flow

import * as a from '../actionTypes';

const indent = (id: string): a.IndentAction => {
  return {
    type: a.INDENT,
    payload: {
      id,
    },
  };
};

export default indent;
