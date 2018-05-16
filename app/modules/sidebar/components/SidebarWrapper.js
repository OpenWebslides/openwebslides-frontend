// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import { sidebarMapping } from '../model/sidebarName';
import { getAllByName } from '../selectors';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  sidebars: SidebarsByName,
};

type Props = PassedProps & StateProps;

const mapStateToProps = (state: State, props: Props): StateProps => {
  const sidebars = getAllByName(state);

  return {
    sidebars,
  };
};

const PureSidebarWrapper = (props: Props): React.Node => {
  const {
    sidebars,
    topicId,
  } = props;

  const widthPerSidebar = Math.floor(16 / sidebars.length);

  const columns: Array<Sidebar> = [];

  for (let i:number = 0; i < sidebars.length; i += 1) {
    const Sidebar = sidebarMapping[sidebars[i]];

    columns.push(
      <Grid.Column key={sidebars[i]} width={widthPerSidebar}>
        <Sidebar topicId={topicId} />
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
