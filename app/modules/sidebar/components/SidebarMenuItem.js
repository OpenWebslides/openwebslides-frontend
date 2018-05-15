// @flow

import * as React from 'react';
import { Icon } from 'semantic-ui-react';

type PassedProps = {
  icon: string,
  sidebarType: string,
};

type Props = PassedProps;

const PureSidebarMenuItem = (props: Props): React.Node => {
  const {
    icon,
  } = props;

  return (
    <div className="editor__sidebarmenu__item">
      <div className="editor__sidebarmenu__button">
        <Icon name={icon} className="editor__sidebarmenu__icon" />
      </div>
    </div>
  );
};

const SidebarMenuItem = PureSidebarMenuItem;

export { PureSidebarMenuItem };
export default SidebarMenuItem;
