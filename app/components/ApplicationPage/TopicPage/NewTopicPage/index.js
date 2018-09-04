// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { type Action } from 'types/action';
import { type State } from 'types/state';
import { USER_PROFILE_ROUTE } from 'config/routes';
import { CorruptedInternalStateError } from 'errors';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';
import users from 'modules/users';

type StateProps = {|
  currentUserId: ?string,
|};

type DispatchProps = {|
  addTopicToCurrentUser: (currentUserId: string, title: string, description: ?string) => void,
|};

type Props = {| ...StateProps, ...DispatchProps |};

const { AuthWrapper } = platform.components;
const { NewTopicCard } = topics.components;

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    addTopicToCurrentUser: (currentUserId: string, title: string, description: ?string): void => {
      dispatch(users.actions.addTopic(currentUserId, title, description));
      dispatch(push(USER_PROFILE_ROUTE));
    },
  };
};

class PureNewTopicPage extends React.Component<Props> {
  handleAddTopic = (title: string, description: ?string): void => {
    const { addTopicToCurrentUser, currentUserId } = this.props;
    if (currentUserId == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
    addTopicToCurrentUser(currentUserId, title, description);
  };

  render(): React.Node {
    const { currentUserId } = this.props;

    return (
      <AuthWrapper>
        <ContainerPageWrapper>
          {(currentUserId == null)
            ? null
            : <NewTopicCard onAddTopic={this.handleAddTopic} />
          }
        </ContainerPageWrapper>
      </AuthWrapper>
    );
  }
}

const NewTopicPage = connect(mapStateToProps, mapDispatchToProps)(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;
