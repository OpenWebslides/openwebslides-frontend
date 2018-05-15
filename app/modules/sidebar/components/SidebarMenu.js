// @flow

import * as React from 'react';
import { Rail } from 'semantic-ui-react';
import SidebarMenuItem from './SidebarMenuItem';

const PureSidebarMenu = (): React.Node => {

  return (
    <Rail position="right" attached={true} className="editor__sidebarmenu">
      <SidebarMenuItem icon="info" />
      <SidebarMenuItem icon="image" />
    </Rail>
  );
};

const SidebarMenu = PureSidebarMenu;

export { PureSidebarMenu };
export default SidebarMenu;
