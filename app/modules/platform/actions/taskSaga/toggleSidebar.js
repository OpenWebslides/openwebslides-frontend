// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const toggleSidebar = (sidebarId: m.SidebarId): a.ToggleSidebarAction => {
  return {
    type: a.TOGGLE_SIDEBAR,
    payload: {
      sidebarId,
    },
  };
};

export default toggleSidebar;
