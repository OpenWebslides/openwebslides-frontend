// @flow

import * as t from '../actionTypes';

const indent = (id: string): t.IndentAction => {
  return {
    type: t.INDENT,
    payload: {
      id,
    },
  };
};

export default indent;
