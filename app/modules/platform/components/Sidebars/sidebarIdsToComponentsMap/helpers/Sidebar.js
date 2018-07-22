// @flow

import * as React from 'react';
import { Header, Icon } from 'semantic-ui-react';

type PassedProps = {|
  children: React.Node,
  className?: string,
  header: string,
  icon: string,
|};

type Props = {| ...PassedProps |};

const PureSidebar = (props: Props): React.Node => {
  const { children, className, header, icon } = props;

  return (
    <div className={`sidebar ${className || ''}`}>
      <div className="sidebar__wrapper">
        <Header as="h3" dividing={true}>
          <Icon name={icon} />
          {header}
        </Header>
        {children}
      </div>
    </div>
  );
};

const Sidebar = PureSidebar;

export { PureSidebar };
export default Sidebar;
