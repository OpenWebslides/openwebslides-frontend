// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Divider, Item } from 'semantic-ui-react';

import FetchWrapper from 'components/FetchWrapper';
import topics from 'modules/topics';

import actions from '../../actions';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  userId: string,
  isCurrentUser: boolean,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { CardCollection } = topics.components;

class PureUserProfile extends React.Component<Props> {
  static defaultProps = {
    isCurrentUser: false,
  };

  renderUserProfile = (user: m.User): React.Node => {
    const { t, isCurrentUser } = this.props;

    return (
      <React.Fragment>
        <Item.Group data-test-id="user-profile-info">
          <Item>
            <Item.Image src={lib.getGravatarSrc(user, 500)} size="small" />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h1">
                {user.name}
              </Item.Header>
              { isCurrentUser && (
                <Item.Extra>
                  <Button as={Link} to="#" data-test-id="user-profile-edit-button">
                    {t('users:actions.editProfile')} (todo)
                  </Button>
                </Item.Extra>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider section={true} />
        <CardCollection topicIds={user.topicIds} />
      </React.Fragment>
    );
  };

  render(): React.Node {
    const { userId } = this.props;

    return (
      <FetchWrapper
        render={this.renderUserProfile}
        renderPropsAndState={this.props}
        fetchId={userId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const UserProfile = translate()(PureUserProfile);

export { PureUserProfile };
export default UserProfile;
