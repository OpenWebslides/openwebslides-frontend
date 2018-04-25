// @flow

import type { Identifier } from 'types/model';

import * as t from './actionTypes';

export const showModal = (
  modalType: string,
  id: Identifier,
): t.ShowModalAction | t.ShowModalErrorAction => {
  return {
    type: t.SHOW_MODAL,
    payload: {
      modalType,
      id,
    },
  };
};

export const hideModal = (
  modalType: string,
): t.HideModalAction | t.HideModalErrorAction => {
  return {
    type: t.HIDE_MODAL,
    payload: {
      modalType,
    },
  };
};
