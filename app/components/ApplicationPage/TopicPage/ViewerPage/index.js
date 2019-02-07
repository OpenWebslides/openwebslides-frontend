// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { type ModulesAction, type AppState } from 'types/redux';
import { USER_PROFILE_ROUTE } from 'config/routes';
import { CorruptedInternalStateError } from 'errors';
import SidebarsPageWrapper from 'components/SidebarsPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';
import users from 'modules/users';

type StateProps = {|
  currentUserId: ?string,
|};

type DispatchProps = {|
  forkTopicToCurrentUser: (currentUserId: string, topicId: string) => void,
|};

type Props = {| ...StateProps, ...DispatchProps, ...RouterProps |};

const { Viewer } = topics.components;

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    forkTopicToCurrentUser: (currentUserId: string, topicId: string): void => {
      dispatch(users.actions.forkTopic(currentUserId, topicId));
      dispatch(push(USER_PROFILE_ROUTE));
    },
  };
};

class PureViewerPage extends React.Component<Props> {
  handleForkTopic = (topicId: string): void => {
    const { forkTopicToCurrentUser, currentUserId } = this.props;
    if (currentUserId == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
    forkTopicToCurrentUser(currentUserId, topicId);
  };

  render(): React.Node {
    const { match: { params: { topicId } } } = this.props;

    return (topicId == null) ? null : (
      <SidebarsPageWrapper topicId={topicId}>
        <Viewer topicId={topicId} onForkTopic={this.handleForkTopic} />
      </SidebarsPageWrapper>
    );
  }
}

const ViewerPage = connect(mapStateToProps, mapDispatchToProps)(PureViewerPage);

export { PureViewerPage };
export default ViewerPage;
