// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Dispatch } from 'redux';

import { toggle as toggleAction } from '../actions';
import type { Sidebar } from '../model';
import { getByName } from '../selectors';

type PassedProps = {
  icon: string,
  sidebarName: string,
};
/*
type StateProps = {
  sidebar: Sidebar,
};
*/
type DispatchProps = {
  toggle: (string) => void,
};

type Props = PassedProps & DispatchProps;

/*
const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const sidebar = getByName(state, { sidebarName: props.sidebarName });

  return sidebar === '' ? null : sidebar;
};
*/

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

  console.log(sidebarName);


  return (
    <div className="editor__sidebarmenu__item">
      <div className="editor__sidebarmenu__button" onClick={() => toggle(sidebarName)}>
        <Icon name={icon} className="editor__sidebarmenu__icon" />
      </div>
    </div>
  );
};

const SidebarMenuItem = connect(null, mapDispatchToProps)(PureSidebarMenuItem);

export { PureSidebarMenuItem };
export default SidebarMenuItem;
