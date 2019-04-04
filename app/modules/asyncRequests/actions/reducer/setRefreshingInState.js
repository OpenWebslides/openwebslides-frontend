// @flow

import * as a from '../../actionTypes';

const setRefreshingInState = (refreshing: boolean): a.SetRefreshingInStateAction => {
  return {
    type: a.SET_REFRESHING_IN_STATE,
    payload: {
      refreshing,
    },
  };
};

export default setRefreshingInState;
