// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

import { USER_PROFILE_ROUTE, USER_SIGNOUT_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  userId: string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureUserAccountMenu extends React.Component<Props> {
  renderUserAccountMenu = (user: m.User): React.Node => {
    const { t } = this.props;

    return (
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="#">
          <Icon name="bell outline" />
        </Menu.Item>
        <Dropdown text={user.name} pointing={true} item={true}>
          <Dropdown.Menu>
            <Dropdown.Header>
              {t('global:navbar.account')}
            </Dropdown.Header>
            <Dropdown.Item as={Link} to={USER_PROFILE_ROUTE}>
              {t('global:navbar.preferences')}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to={USER_SIGNOUT_ROUTE}>
              {t('global:navbar.signout')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  };

  render(): React.Node {
    const { userId } = this.props;

    return (
      <FetchWrapper
        render={this.renderUserAccountMenu}
        fetchId={userId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const UserAccountMenu = translate()(PureUserAccountMenu);

export { PureUserAccountMenu };
export default UserAccountMenu;
