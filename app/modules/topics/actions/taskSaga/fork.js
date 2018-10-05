// @flow

import * as a from '../../actionTypes';

const fork = (id: string): a.ForkAction => {
  return {
    type: a.FORK,
    payload: {
      id,
    },
  };
};

export default fork;
