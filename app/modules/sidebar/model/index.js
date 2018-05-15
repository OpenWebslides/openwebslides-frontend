// @flow

export type Sidebar = {
  +id: string,
};

export type SidebarsByName = {
  +[topicId: Identifier]: Sidebar,
};

/*
export type SidebarsState = {
  +byName: SidebarsById,
};
*/

export type SidebarsState = {
  +size: number,
  +[position: number]: Sidebar,
};
