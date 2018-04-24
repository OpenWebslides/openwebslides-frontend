// @flow

import * as t from './actionTypes';
import type { ModalsState } from './model';

const initialState: ModalsState = {
  id: '',
  modalType: '',
};


const showModal = (state: ModalsState, action: t.ShowModalAction): ModalsState => {
  console.log('A motherflippin modal should be shown!');
  console.log(`type=${action.payload.modalType} && id=${action.payload.id}`);

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
  console.log('A motherflippin modal should be hidden now!');
  console.log(`type=${action.payload.modalType}`);

  // TODO: check if modalType is ever needed (in case of multiple modals i guess?)
  return {
    ...initialState,
  };
};

const reducer = (state: ModalsState = initialState, action: t.ModalAction): ModalsState => {
  switch (action.type) {
    case t.SHOWMODAL:
      return showModal(state, action);
    case t.HIDEMODAL:
      return hideModal(state, action);
    case t.SHOWMODAL_ERROR:
    case t.HIDEMODAL_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
