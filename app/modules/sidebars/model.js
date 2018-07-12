// @flow

const INFO: 'SidebarName/INFO' = 'SidebarName/INFO';
const SLIDE: 'SidebarName/SLIDE' = 'SidebarName/SLIDE';

// Group all sidebars.
export const sidebarNames = {
  INFO,
  SLIDE,
};

export type SidebarName = $Values<typeof sidebarNames>;

export type SidebarsState = {
  +activeSidebars: Array<SidebarName>,
};
