// @flow

const TOPIC_INFO: 'sideBarIds/TOPIC_INFO' = 'sideBarIds/TOPIC_INFO';
const SLIDE_PREVIEWS: 'sideBarIds/SLIDE_PREVIEWS' = 'sideBarIds/SLIDE_PREVIEWS';

// Note: order of ids here determines order of buttons in sidebarmenu
export const sidebarIds = {
  TOPIC_INFO,
  SLIDE_PREVIEWS,
};

export type SidebarId = $Values<typeof sidebarIds>;
