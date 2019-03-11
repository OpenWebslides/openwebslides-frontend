// @flow

import * as a from '../../actionTypes';

const refresh = (): a.RefreshAction => {
  return {
    type: a.REFRESH,
    payload: {},
  };
};

export default refresh;
