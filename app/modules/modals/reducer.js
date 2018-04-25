// @flow

import * as t from './actionTypes';
import type { ModalsState } from './model';

const initialState: ModalsState = {
  id: '',
  modalType: '',
};


const showModal = (state: ModalsState, action: t.ShowModalAction): ModalsState => {
  const {
    id,
    modalType,
  } = action.payload;

  return {
    id,
    modalType,
  };
};

const hideModal = (state: ModalsState, action: t.HideModalAction): ModalsState => {
  // TODO: check if modalType is ever needed (in case of multiple modals i guess?)
  return {
    ...initialState,
  };
};

const reducer = (state: ModalsState = initialState, action: t.ModalAction): ModalsState => {
  switch (action.type) {
    case t.SHOW_MODAL:
      return showModal(state, action);
    case t.HIDE_MODAL:
      return hideModal(state, action);
    case t.SHOW_MODAL_ERROR:
    case t.HIDE_MODAL_ERROR:
      return state;
    default:
      return state;
  }
};

export default reducer;
