// @flow

import type { State } from 'types/state';
import type { Modal, ModalsState } from './model';

const getModule = (state: State): ModalsState => {
  return state.modules.modals;
};

export const getModal = (state: State): Modal => {
  return getModule(state);
};
