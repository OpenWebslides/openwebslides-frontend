// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import { toggle as toggleAction } from '../actions';

type PassedProps = {
  icon: string,
  sidebarName: string,
};

type DispatchProps = {
  dispatchToggle: (string) => void,
};

type LocalState = {
  open: boolean,
};

type Props = PassedProps & DispatchProps;

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    dispatchToggle: (sidebarName: string): void => {
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

  toggle = (sidebarName: string): void => {
    this.setState({ active: !this.state.active });
    this.props.dispatchToggle(sidebarName);
  };

  render = (): React.Node => {
    const {
      sidebarName,
      icon,
    } = this.props;

    return (
      <div className="sidebarMenu__item">
        <Button className="sidebarMenu__button" toggle={true} active={this.state.active} onClick={() => this.toggle(sidebarName)}>
          <Icon name={icon} className="sidebarMenu__icon" />
        </Button>
      </div>
    );
  };
}

const SidebarMenuItem = connect(null, mapDispatchToProps)(PureSidebarMenuItem);

export { PureSidebarMenuItem };
export default SidebarMenuItem;
