// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import { toggle as toggleAction } from '../actions';

type PassedProps = {
  icon: string,
  sidebarName: string,
};

type DispatchProps = {
  toggle: (string) => void,
};

type Props = PassedProps & DispatchProps;

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    toggle: (sidebarName: string): void => {
      dispatch(
        toggleAction(sidebarName),
      );
    },
  };
};

const PureSidebarMenuItem = (props: Props): React.Node => {
  const {
    toggle,
    sidebarName,
    icon,
  } = props;

  return (
    <div className="editor__sidebarmenu__item">
      <button className="editor__sidebarmenu__button" onClick={() => toggle(sidebarName)}>
        <Icon name={icon} className="editor__sidebarmenu__icon" />
      </button>
    </div>
  );
};

const SidebarMenuItem = connect(null, mapDispatchToProps)(PureSidebarMenuItem);

export { PureSidebarMenuItem };
export default SidebarMenuItem;
