// @flow

import type { Identifier } from 'types/model';
import type { ContentItemType } from 'modules/content-items';
import type { SlideStylingRules } from './model';

export const ADD_TO_STATE: 'slideStyling/ADD_TO_STATE' = 'slideStyling/ADD_TO_STATE';
export const EDIT_CONTENTTYPE_COLOR_IN_STATE: 'slideStyling/EDIT_CONTENTTYPE_COLOR_IN_STATE' = 'slideStyling/EDIT_CONTENTTYPE_COLOR_IN_STATE';
export const EDIT_BACKGROUND_COLOR: 'slideStyling/EDIT_BACKGROUND_COLOR' = 'slideStyling/EDIT_BACKGROUND_COLOR';

export type AddToStateAction = {
  type: typeof ADD_TO_STATE,
  payload: {
    id: Identifier,
    userId: Identifier,
    rules: SlideStylingRules,
  },
};

export type EditContentTypeColorAction = {
  type: typeof EDIT_CONTENTTYPE_COLOR_IN_STATE,
  payload: {
    id: Identifier,
    contentItemType: ContentItemType,
    newColor: string,
  },
};

export type editBackgroundColorAction = {
  type: typeof EDIT_BACKGROUND_COLOR,
  payload: {
    rootContentItemId: Identifier,
    color: string,
    // #TODO stub
  },
};

export type SlideStylingReducerAction =
  | AddToStateAction
  | EditContentTypeColorAction;
