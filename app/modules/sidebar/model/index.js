// @flow

export type Sidebar = string;

export type SidebarsByName = Array<Sidebar>;

export type SidebarsState = {
  +byName: SidebarsByName,
};
