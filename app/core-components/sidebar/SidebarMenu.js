// @flow

import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const PureSidebarMenu = (): React.Node => {
  return (
    <React.Fragment>
      <Button
        as="span"
        primary={true}
      >
        <Icon name="image" className="editor__sidemenu__icon" />
      </Button>
    </React.Fragment>
  );
};

const SidebarMenu = PureSidebarMenu;

export { PureSidebarMenu };
export default SidebarMenu;
