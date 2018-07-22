// @flow

import * as t from '../../actionTypes';
import * as m from '../../model';

const toggleSidebar = (sidebarId: m.SidebarId): t.ToggleSidebarAction => {
  return {
    type: t.TOGGLE_SIDEBAR,
    payload: {
      sidebarId,
    },
  };
};

export default toggleSidebar;
