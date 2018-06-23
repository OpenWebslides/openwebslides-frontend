// @flow

import * as React from 'react';
import _ from 'lodash';
import type { State } from 'types/state';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import type { SidebarName } from '../model';

import { toggle as toggleAction } from '../actions';
import { getAllActiveSidebars } from '../selectors';

type PassedProps = {
  icon: string,
  sidebarName: SidebarName,
};

type DispatchProps = {
  toggle: (SidebarName) => void,
};

type StateProps = {
  menuItemActive: boolean,
};

type Props = PassedProps & DispatchProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const sidebars = getAllActiveSidebars(state);

  const menuItemActive = _.indexOf(sidebars, props.sidebarName) !== -1;

  return {
    menuItemActive,
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

const PureSidebarMenuItem = (props: Props): React.Node => {
  const {
    sidebarName,
    icon,
    menuItemActive,
    toggle,
  } = props;

  return (
    <div className="sidebar-menu__item">
      <Button
        className="sidebar-menu__button"
        toggle={true}
        active={menuItemActive}
        // #TODO
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => toggle(sidebarName)}
      >
        <Icon name={icon} className="sidebar-menu__icon" />
      </Button>
    </div>
  );
};

const SidebarMenuItem = connect(mapStateToProps, mapDispatchToProps)(PureSidebarMenuItem);

export { PureSidebarMenuItem };
export default SidebarMenuItem;
