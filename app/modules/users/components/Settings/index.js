// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Item, Header } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  userId: string,
|};

type DispatchProps = {|
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: Props,
): DispatchProps => {
  return {};
};

class PureSettings extends React.Component<Props> {
  renderSettings = (user: m.User): React.Node => {
    const { t } = this.props;

    return (
      <>
        <Item.Group data-test-id="user-profile-info">
          <Item>
            <Item.Image src={lib.getGravatarSrc(user, 500)} size="tiny" />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h1">
                {user.name}
              </Item.Header>
              { user.email != null && (
                <Item.Extra data-test-id="user-profile-email">
                  {user.email}
                </Item.Extra>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h3" floated="left">{t('global:title.settings')}</Header>
      </>
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

const Settings = withNamespaces()(connect(null, mapDispatchToProps)(PureSettings));

export { PureSettings };
export default Settings;
