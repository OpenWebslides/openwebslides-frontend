// @flow

import InfoSidebar from '../components/sidebars/InfoSidebar';
import SlideSidebar from '../components/sidebars/SlideSidebar';

const INFO: 'SidebarName/INFO' = 'SidebarName/INFO';
const SLIDE: 'SidebarName/SLIDE' = 'SidebarName/SLIDE';

// Group all sidebars.
export const sidebar = {
  INFO,
  SLIDE,
};

export const sidebarMapping = {
  'SidebarName/INFO': InfoSidebar,
  'SidebarName/SLIDE': SlideSidebar,
}

export type SidebarName = $Values<typeof sidebar>;
