// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';

export const SHOW_MODAL: 'modals/SHOW_MODAL' = 'modals/SHOW_MODAL';
export const HIDE_MODAL: 'modals/HIDE_MODAL' = 'modals/HIDE_MODAL';

export const SHOW_MODAL_ERROR: 'modals/SHOW_MODAL_ERROR' = 'modals/SHOW_MODAL_ERROR';
export const HIDE_MODAL_ERROR: 'modals/HIDE_MODAL_ERROR' = 'modals/HIDE_MODAL_ERROR';

export type ShowModalAction = {
  type: typeof SHOW_MODAL,
  payload: {
    modalType: string,
    id: Identifier,
  },
};

export type HideModalAction = {
  type: typeof HIDE_MODAL,
  payload: {
    modalType: string,
  },
};

export type ShowModalErrorAction = {
  type: typeof SHOW_MODAL_ERROR,
  error: Error,
};

export type HideModalErrorAction = {
  type: typeof HIDE_MODAL_ERROR,
  error: Error,
};


export type ModalAction =
  | ShowModalAction
  | HideModalAction
  | ShowModalErrorAction
  | HideModalErrorAction;
