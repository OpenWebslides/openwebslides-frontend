// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import type { State } from 'types/state';
import SlideSidebar from './sidebars/SlideSidebar';
import { getAllByName } from '../selectors';


type StateProps = {
  sidebars: SidebarsByName,
};

type Props = StateProps;

const mapStateToProps = (state: State, props: Props): StateProps => {
  const sidebars = getAllByName(state);

  return {
    sidebars,
  };
};

const PureSidebarWrapper = (props: Props): React.Node => {
  const {
    sidebars,
  } = props;

  const widthPerSidebar = Math.floor(16 / sidebars.length);

  const columns: Array<Sidebar> = [];

  for (let i:number = 0; i < sidebars.length; i += 1) {
    columns.push(
      <Grid.Column key={sidebars[i]} width={widthPerSidebar}>
        <SlideSidebar contentItemTreeRootItemId="qyrgv0bcd6" />
      </Grid.Column>,
    );
  }

  return (
    <Grid>
      { columns }
    </Grid>
  );
};

const SidebarWrapper = connect(mapStateToProps)(PureSidebarWrapper);

export { PureSidebarWrapper };
export default SidebarWrapper;
