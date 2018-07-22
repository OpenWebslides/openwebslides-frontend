// @flow

import _ from 'lodash';
import * as React from 'react';
import { Menu } from 'semantic-ui-react';

import * as m from '../../model';

import SidebarsMenuItem from './SidebarsMenuItem';

type Props = {| |};

const PureSidebarsMenu = (props: Props): React.Node => {
  return (
    <Menu tabular="right" vertical={true} icon={true} className="sidebars-menu">
      {_.values(m.sidebarIds).map((sidebarId: m.SidebarId): React.Node => (
        <SidebarsMenuItem
          key={sidebarId}
          sidebarId={sidebarId}
        />
      ))}
    </Menu>
  );
};

const SidebarsMenu = PureSidebarsMenu;

export { PureSidebarsMenu };
export default SidebarsMenu;
