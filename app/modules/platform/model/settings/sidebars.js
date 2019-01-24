// @flow

/* eslint-disable flowtype/require-types-at-top */

const TOPIC_INFO: 'sideBarIds/TOPIC_INFO' = 'sideBarIds/TOPIC_INFO';
const SLIDE_PREVIEWS: 'sideBarIds/SLIDE_PREVIEWS' = 'sideBarIds/SLIDE_PREVIEWS';
const CONTRIBUTE: 'sideBarIds/CONTRIBUTE' = 'sideBarIds/CONTRIBUTE';

// Note: order of ids here determines order of buttons in sidebarmenu
export const sidebarIds = {
  TOPIC_INFO,
  SLIDE_PREVIEWS,
  CONTRIBUTE,
};

export type SidebarId = $Values<typeof sidebarIds>;
