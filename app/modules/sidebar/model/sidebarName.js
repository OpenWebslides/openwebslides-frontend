// @flow

const INFO: 'SidebarName/INFO' = 'SidebarName/INFO';
const SLIDE: 'SidebarName/SLIDE' = 'SidebarName/SLIDE';

// Group all sidebars.
export const sidebar = {
  INFO,
  SLIDE,
};

export type SidebarName = $Values<typeof sidebar>;
