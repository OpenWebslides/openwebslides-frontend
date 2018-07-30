// @flow

import * as a from '../../actionTypes';

const get = (
  id: string,
): a.GetAction => {
  return {
    type: a.GET,
    payload: {
      id,
    },
  };
};

export default get;
