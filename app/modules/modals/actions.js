// @flow

import type { Identifier } from 'types/model';

import * as t from './actionTypes';

export const showModal = (
  modalType: string,
  id: Identifier,
): t.ShowModalAction | t.ShowModalErrorAction => {
  return {
    type: t.SHOWMODAL,
    payload: {
      modalType,
      id,
    },
  };
};
