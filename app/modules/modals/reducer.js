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
  return {
    ...state,
  };
};

const reducer = (state: ModalsState = initialState, action: t.ModalAction): ModalsState => {
  switch (action.type) {
    case t.SHOWMODAL:
      return showModal(state, action);
    case t.SHOWMODAL_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
