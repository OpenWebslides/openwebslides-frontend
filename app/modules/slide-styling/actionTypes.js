// @flow

import type { Identifier } from 'types/model';
// import type { ContentItem } from '../content-items/model';

export const EDIT_TITLE_COLOR_IN_STATE: 'slideStyling/EDIT_TITLE_COLOR_IN_STATE' = 'slideStyling/EDIT_TITLE_COLOR_IN_STATE';
export const EDIT_BACKGROUND_COLOR: 'slideStyling/EDIT_BACKGROUND_COLOR' = 'slideStyling/EDIT_BACKGROUND_COLOR';

export type editTitleColorAction = {
  type: typeof EDIT_TITLE_COLOR_IN_STATE,
  payload: {
    rootContentItemId: Identifier,
    color: string,
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
