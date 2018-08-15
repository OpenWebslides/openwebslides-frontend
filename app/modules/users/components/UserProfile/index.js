// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Item } from 'semantic-ui-react';

import { type Action } from 'types/action';
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

type DispatchProps = {|
  removeTopicFromUser: (topicId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const { CardCollection: TopicCardCollection } = topics.components;

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: PassedProps): DispatchProps => {
  const { userId } = props;

  return {
    removeTopicFromUser: (topicId: string): void => {
      dispatch(actions.removeTopic(userId, topicId));
    },
  };
};

class PureUserProfile extends React.Component<Props> {
  static defaultProps = {
    isCurrentUser: false,
  };

  renderUserProfile = (user: m.User): React.Node => {
    const { t, isCurrentUser, removeTopicFromUser } = this.props;

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
        <TopicCardCollection
          topicIds={user.topicIds}
          isCurrentUser={isCurrentUser}
          onRemoveTopic={removeTopicFromUser}
        />
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

const UserProfile = translate()(connect(null, mapDispatchToProps)(PureUserProfile));

export { PureUserProfile };
export default UserProfile;
