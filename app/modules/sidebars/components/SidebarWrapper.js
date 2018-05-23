// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { SidebarName } from '../model';
import { getAllActiveSidebars } from '../selectors';
import Sidebar from './sidebars/Sidebar';
import { AMOUNT_OF_COLS_IN_GRID } from '../constants';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  sidebars: Array<SidebarName>,
};

type Props = PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const sidebars = getAllActiveSidebars(state);

  return {
    sidebars,
  };
};

const PureSidebarWrapper = (props: Props): React.Node => {
  const {
    sidebars,
    topicId,
  } = props;

  const widthPerSidebar = Math.floor(AMOUNT_OF_COLS_IN_GRID / sidebars.length);

  const columns: Array<React.Node> = [];

  for (let i:number = 0; i < sidebars.length; i += 1) {
    columns.push(
      <Grid.Column key={sidebars[i]} className="sidebar-column" width={widthPerSidebar}>
        <Sidebar sidebarName={sidebars[i]} topicId={topicId} />
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
