// @flow

import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Menu, Icon } from 'semantic-ui-react';

import { type State } from 'types/state';

import actions from '../../../../actions';
import * as m from '../../../../model';
import selectors from '../../../../selectors';

type PassedProps = {|
  sidebarId: m.SidebarId,
|};

type StateProps = {|
  isActive: boolean,
|};

type DispatchProps = {|
  handleMenuItemClick: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const sidebarIdsToIconsMap = {
  [m.sidebarIds.TOPIC_INFO]: 'info',
  [m.sidebarIds.SLIDE_PREVIEWS]: 'image',
};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { sidebarId } = props;
  const activeSidebarIds = selectors.getSettingByKey(state, { key: 'activeSidebarIds' });

  return {
    isActive: _.includes(activeSidebarIds, sidebarId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, props: PassedProps): DispatchProps => {
  const { sidebarId } = props;

  return {
    handleMenuItemClick: (): void => {
      dispatch(actions.toggleSidebar(sidebarId));
    },
  };
};

const PureSidebarsMenuItem = (props: Props): React.Node => {
  const { sidebarId, isActive, handleMenuItemClick } = props;

  return (
    <Menu.Item
      fitted="horizontally"
      name={sidebarId}
      active={isActive}
      onClick={handleMenuItemClick}
    >
      <Icon name={sidebarIdsToIconsMap[sidebarId]} />
    </Menu.Item>
  );
};

const SidebarsMenuItem = connect(mapStateToProps, mapDispatchToProps)(
  translate()(PureSidebarsMenuItem),
);

export { PureSidebarsMenuItem };
export default SidebarsMenuItem;
