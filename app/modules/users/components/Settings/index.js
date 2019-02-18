// @flow

import * as React from 'react';
import { Translation, Trans } from 'react-i18next';
import { Item, Header, Tab } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { TOS_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

import ProfilePane from './ProfilePane';
import AccountPane from './AccountPane';

type PassedProps = {|
  userId: string,
|};

type Props = {| ...PassedProps |};

class PureSettings extends React.Component<Props> {
  renderSettings = (user: m.User): React.Node => {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <>
            <Item.Group data-test-id="user-settings-info">
              <Item>
                <Item.Image src={lib.getGravatarSrc(user, 500)} size="tiny" />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h1">
                    {user.name}
                  </Item.Header>
                  <Item.Extra data-test-id="user-settings-email">
                    {user.email}
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
            <Header as="h3" floated="left">{t('global:title.settings')}</Header>
            <Tab
              panes={[
                { menuItem: t('settings:panes.profile'),
                  render: (): React.Node => {
                    return <ProfilePane user={user} />;
                  },
                },
                { menuItem: t('settings:panes.account'),
                  render: (): React.Node => {
                    return <AccountPane user={user} />;
                  },
                },
              ]}
              className="settings"
            />

            <small>
              <Trans i18nKey="settings:tos">
                <a href={TOS_ROUTE} target="_blank" rel="noopener noreferrer">TOS</a>
              </Trans>
            </small>
          </>
        )}
      </Translation>
    );
  };

  render(): React.Node {
    const { userId } = this.props;

    return (
      <FetchWrapper
        render={this.renderSettings}
        renderPropsAndState={this.props}
        fetchId={userId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const Settings = PureSettings;

export { PureSettings };
export default Settings;
