// @flow

import type { Identifier } from 'types/model';
import type { ContentItemType } from 'modules/content-items';

import * as t from './actionTypes';
import { contentItemTypes } from '../content-items/model';

// add custom theme
export const addToState = (
  id: Identifier,
  userId: Identifier,
): t.AddToStateAction => {
  return {
    type: t.ADD_TO_STATE,
    payload: {
      id,
      userId,
      rules: {
        [contentItemTypes.HEADING]: {
          color: '#000000',
          font: 'Verdana',
        },
        [contentItemTypes.PARAGRAPH]: {
          color: '#000000',
          font: 'Verdana',
        },
      },
    },
  };
};

export const editContentTypeColorInState = (
  id: Identifier,
  contentItemType: ContentItemType,
  newColor: string,
  font: string,
): t.EditContentTypeColorAction => {
  return {
    type: t.EDIT_CONTENTTYPE_COLOR_IN_STATE,
    payload: {
      id,
      contentItemType,
      newColor,
      font,
    },
  };
};

export const editFontInState = (
  id: Identifier,
  newFont: string,
  colorHeading: string,
  colorParagraph: string,
): t.EditFontAction => {
  return {
    type: t.EDIT_FONT_IN_STATE,
    payload: {
      id,
      newFont,
      colorHeading,
      colorParagraph,
    },
  };
};
