// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { USER_PROFILE_ROUTE, USER_SETTINGS_ROUTE, USER_SIGNOUT_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  userId: string,
|};

type Props = {| ...PassedProps |};

class PureUserAccountMenu extends React.Component<Props> {
  renderUserAccountMenu = (user: m.User): React.Node => {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Dropdown text={user.name} pointing={true} item={true} data-test-id="user-account-menu">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={USER_PROFILE_ROUTE}>
                {t('global:title.library')}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={USER_SETTINGS_ROUTE}>
                {t('global:title.settings')}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={USER_SIGNOUT_ROUTE}>
                {t('global:navbar.signout')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Translation>
    );
  };

  render(): React.Node {
    const { userId } = this.props;

    return (
      <FetchWrapper
        render={this.renderUserAccountMenu}
        renderPropsAndState={this.props}
        fetchId={userId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const UserAccountMenu = PureUserAccountMenu;

export { PureUserAccountMenu };
export default UserAccountMenu;
