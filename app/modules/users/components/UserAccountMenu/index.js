// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

import { type State } from 'types/state';
import { USER_PROFILE_ROUTE, USER_SIGNOUT_ROUTE } from 'config/routes';

import * as actions from '../../actions';
import * as m from '../../model';
import * as selectors from '../../selectors';

type PassedProps = {|
  userId: string,
|};

type StateProps = {|
  user: ?m.User,
|};

type DispatchProps = {|
  getUser: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { userId } = props;

  return {
    user: selectors.getById(state, userId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>, props: PassedProps): DispatchProps => {
  const { userId } = props;
  return {
    getUser: (): void => {
      dispatch(actions.get(userId));
    },
  };
};

class PureUserAccountMenu extends React.Component<Props> {
  componentDidMount(): void {
    const { user, getUser } = this.props;
    if (user == null) getUser();
  }

  render(): React.Node {
    const { t, user } = this.props;

    return (user == null) ? null : (
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="#">
          <Icon name="bell outline" />
        </Menu.Item>
        <Dropdown text={m.getName(user)} pointing={true} item={true}>
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
  }
}

const UserAccountMenu = connect(mapStateToProps, mapDispatchToProps)(
  translate()(PureUserAccountMenu),
);

export { PureUserAccountMenu };
export default UserAccountMenu;
