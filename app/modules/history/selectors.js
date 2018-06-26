// @flow

import type { State } from 'types/state';
import type { HistoryState } from './model';

const getModule = (state: State): HistoryState => {
  return state.modules.history;
};

export const getLocation = (state: State): ?string => {
  return getModule(state).location;
};
