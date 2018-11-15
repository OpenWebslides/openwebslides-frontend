// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Item } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
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

const { TopicsList } = topics.components;

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
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
    const { isCurrentUser, removeTopicFromUser } = this.props;

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
        <TopicsList
          topicIds={user.topicIds}
          isCurrentUser={isCurrentUser}
          onRemoveTopic={removeTopicFromUser}
        />
      </>
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

const UserProfile = withNamespaces()(connect(null, mapDispatchToProps)(PureUserProfile));

export { PureUserProfile };
export default UserProfile;
