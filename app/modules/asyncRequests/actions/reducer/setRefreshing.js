// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setRefreshing = (refreshing: boolean): a.SetRefreshingAction => {
  return {
    type: a.SET_REFRESHING,
    payload: {
      refreshing,
    },
  };
};

export default setRefreshing;
