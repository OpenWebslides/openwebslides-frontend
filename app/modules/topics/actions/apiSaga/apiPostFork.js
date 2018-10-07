// @flow

import * as a from '../../actionTypes';

const apiPostFork = (id: string): a.ApiPostForkAction => {
  return {
    type: a.API_POST_FORK,
    payload: {
      id,
    },
  };
};

export default apiPostFork;
