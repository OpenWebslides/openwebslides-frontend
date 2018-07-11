// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Grid, Icon } from 'semantic-ui-react';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { SidebarName } from '../model';
import { getAllActiveSidebars } from '../selectors';
import Sidebar from './sidebars/Sidebar';
import { AMOUNT_OF_COLS_IN_GRID } from '../constants';
import { toggle as toggleAction } from '../actions';

type DispatchProps = {
  toggle: (SidebarName) => void,
};

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  sidebars: Array<SidebarName>,
};

type Props = PassedProps & StateProps & DispatchProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const sidebars = getAllActiveSidebars(state);

  return {
    sidebars,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    toggle: (sidebarName: SidebarName): void => {
      dispatch(
        toggleAction(sidebarName),
      );
    },
  };
};

const PureSidebarWrapper = (props: Props): React.Node => {
  const {
    sidebars,
    topicId,
    toggle,
  } = props;

  const widthPerSidebar = Math.floor(AMOUNT_OF_COLS_IN_GRID / sidebars.length);

  const columns: Array<React.Node> = [];

  for (let i: number = 0; i < sidebars.length; i += 1) {
    columns.push(
      <Grid.Column key={sidebars[i]} className="sidebar-column" width={widthPerSidebar}>
        <Icon
          name="close"
          size="small"
          circular={true}
          inverted={true}
          className="sidebar__icon"
          // #TODO
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => toggle(sidebars[i])}
        />
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

const SidebarWrapper = connect(mapStateToProps, mapDispatchToProps)(PureSidebarWrapper);

export { PureSidebarWrapper };
export default SidebarWrapper;
