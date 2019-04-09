// @flow

import { type AppState } from 'types/redux';

const getCurrentlySelectedId = (state: AppState): ?string => {
  return state.modules.contentItems.currentlySelectedId;
};

export default getCurrentlySelectedId;
