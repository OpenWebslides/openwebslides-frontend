// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';

export const SHOWMODAL: 'modals/SHOWMODAL' = 'modals/SHOWMODAL';
export const SHOWMODAL_ERROR: 'modals/SHOWMODAL_ERROR' = 'modals/SHOWMODAL_ERROR';

export type ShowModalAction = {
  type: typeof SHOWMODAL,
  payload: {
    modalType: string,
    id: Identifier,
  },
};

export type ShowModalErrorAction = {
  type: typeof SHOWMODAL_ERROR,
  error: Error,
};


export type ModalAction =
  | ShowModalAction
  | ShowModalErrorAction;
