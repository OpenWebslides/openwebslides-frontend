// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import type { SidebarName } from '../model';

import { toggle as toggleAction } from '../actions';

type PassedProps = {
  icon: string,
  sidebarName: SidebarName,
};

type DispatchProps = {
  dispatchToggle: (SidebarName) => void,
};

type LocalState = {
  active: boolean,
};

type Props = PassedProps & DispatchProps;

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    dispatchToggle: (sidebarName: SidebarName): void => {
      dispatch(
        toggleAction(sidebarName),
      );
    },
  };
};

class PureSidebarMenuItem extends React.Component<Props, LocalState> {
  state: LocalState = {
    active: false,
  };

  toggle = (sidebarName: SidebarName, active: boolean): void => {
    this.setState({ active: !active });
    this.props.dispatchToggle(sidebarName);
  };

  render = (): React.Node => {
    const {
      sidebarName,
      icon,
    } = this.props;

    return (
      <div className="sidebar-menu__item">
        <Button
          className="sidebar-menu__button"
          toggle={true}
          active={this.state.active}
          onClick={() => this.toggle(sidebarName, this.state.active)}
        >
          <Icon name={icon} className="sidebar-menu__icon" />
        </Button>
      </div>
    );
  };
}

const SidebarMenuItem = connect(null, mapDispatchToProps)(PureSidebarMenuItem);

export { PureSidebarMenuItem };
export default SidebarMenuItem;
