// @flow

const INFO: 'NamedSidebar/INFO' = 'NamedSidebar/INFO';
const SLIDE: 'NamedSidebar/SLIDE' = 'NamedSidebar/SLIDE';

// Group all sidebars.
export const sidebar = {
  INFO,
  SLIDE,
};

export type NamedSidebar = $Values<typeof sidebar>;
