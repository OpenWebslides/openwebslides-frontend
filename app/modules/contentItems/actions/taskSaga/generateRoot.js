// @flow

import * as a from '../../actionTypes';

const generateRoot = (): a.GenerateRootAction => {
  return {
    type: a.GENERATE_ROOT,
    payload: {},
  };
};

export default generateRoot;
