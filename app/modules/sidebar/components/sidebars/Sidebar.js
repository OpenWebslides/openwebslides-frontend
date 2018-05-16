// @flow

import * as React from 'react';

type PassedProps = {
  children: React.Node,
};

type Props = PassedProps;

const PureSidebar = (props: Props): React.Node => {
  return (
    <div className="editor__sidebar">
      {props.children}
    </div>
  );
};

const Sidebar = PureSidebar;

export { PureSidebar };
export default Sidebar;
