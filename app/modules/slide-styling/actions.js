// @flow

import type { Identifier } from 'types/model';

import * as t from './actionTypes';

export const editTitleColorInState = (
  rootContentItemId: Identifier,
  color: string,
): t.editTitleColorAction => {
  const newColor = color;
  const newID = rootContentItemId;
  return {
    type: t.EDIT_TITLE_COLOR_IN_STATE,
    payload: {
      rootContentItemId: newID,
      color: newColor,
    },
  };
};
