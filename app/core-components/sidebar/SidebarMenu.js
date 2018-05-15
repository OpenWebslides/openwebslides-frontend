// @flow

import * as React from 'react';
import { Rail, Icon } from 'semantic-ui-react';

const PureSidebarMenu = (): React.Node => {
  return (
    <Rail position="right" attached={true} className="editor__sidebarmenu">
      <div className="editor__sidebarmenu__item">
        <div className="editor__sidebarmenu__button">
          <Icon name="info" className="editor__sidebarmenu__icon" />
        </div>
      </div>
      <div className="editor__sidebarmenu__item">
        <div className="editor__sidebarmenu__button">
          <Icon name="image" className="editor__sidebarmenu__icon" />
        </div>
      </div>
    </Rail>
  );
};

const SidebarMenu = PureSidebarMenu;

export { PureSidebarMenu };
export default SidebarMenu;
