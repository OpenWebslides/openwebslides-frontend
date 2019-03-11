// @flow

import * as a from '../../actionTypes';

const refresh = (email: string): a.RefreshAction => {
  return {
    type: a.REFRESH,
    payload: {
      email,
    },
  };
};

export default refresh;
