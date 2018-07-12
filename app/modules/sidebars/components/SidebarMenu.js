// @flow

import * as React from 'react';
import { Rail } from 'semantic-ui-react';

import { sidebarNames } from '../model';

import SidebarMenuItem from './SidebarMenuItem';

const PureSidebarMenu = (): React.Node => {
  return (
    <Rail position="right" attached={true} className="sidebar-menu">
      <SidebarMenuItem sidebarName={sidebarNames.INFO} icon="info" />
      <SidebarMenuItem sidebarName={sidebarNames.SLIDE} icon="image" />
    </Rail>
  );
};

const SidebarMenu = PureSidebarMenu;

export { PureSidebarMenu };
export default SidebarMenu;
