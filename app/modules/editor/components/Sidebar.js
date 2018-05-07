// @flow

import * as React from 'react';

type PassedProps = {
  children: React.Node,
};

type Props = PassedProps;

const PureSidebar = (props: Props): React.Node => {
  return (
    <React.Fragment>
      { props.children }
    </React.Fragment>
  );
};

const Sidebar = PureSidebar;

export { PureSidebar };
export default Sidebar;
