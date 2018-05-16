// @flow

export type Sidebar = {
  +sidebarName: string,
};

export type SidebarsByName = Array<Sidebar>;

export type SidebarsState = {
  +byName: SidebarsByName,
};
