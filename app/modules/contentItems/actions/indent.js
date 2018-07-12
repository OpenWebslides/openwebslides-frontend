// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

const indent = (id: Identifier): t.IndentAction => {
  return {
    type: t.INDENT,
    payload: {
      id,
    },
  };
};

export default indent;
