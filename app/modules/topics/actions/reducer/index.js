// @flow

import removeFromState from './removeFromState';
import setDirtyInState from './setDirtyInState';
import setMultipleInState from './setMultipleInState';
import toggleContentFetchedInState from './toggleContentFetchedInState';

const reducerActions = {
  removeFromState,
  setDirtyInState,
  setMultipleInState,
  toggleContentFetchedInState,
};

export default reducerActions;
