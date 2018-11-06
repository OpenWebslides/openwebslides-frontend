// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';

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
      <Dropdown text={user.name} pointing={true} item={true} data-test-id="user-account-menu">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={USER_PROFILE_ROUTE}>
            {t('users:actions.viewProfile')}
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={USER_SIGNOUT_ROUTE}>
            {t('users:actions.signOut')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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

const UserAccountMenu = withNamespaces()(PureUserAccountMenu);

export { PureUserAccountMenu };
export default UserAccountMenu;
