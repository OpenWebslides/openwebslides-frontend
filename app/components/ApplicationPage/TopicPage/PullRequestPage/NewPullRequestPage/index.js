// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { push } from 'connected-react-router';

import { type ModulesAction, type AppState } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import FetchWrapper from 'components/FetchWrapper';
import { CorruptedInternalStateError } from 'errors';
import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';
import topics from 'modules/topics';

type StateProps = {|
  currentUserId: ?string,
|};

type DispatchProps = {|
  createPullRequest: (
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    currentUserId: string,
  ) => void,
|};

type Props = {| ...StateProps, ...DispatchProps, ...RouterProps |};

const { AuthWrapper } = platform.components;
const { NewPullRequestCard } = pullRequests.components;

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    createPullRequest: (
      message: string,
      sourceTopicId: string,
      targetTopicId: string,
      currentUserId: string,
    ): void => {
      // TODO: dispatch create new pull request action
      dispatch(pullRequests.actions.create(message, sourceTopicId, targetTopicId, currentUserId));
      console.log('dispatch(pullRequests.actions.create)');
      dispatch(push(makeRoute(TOPIC_EDITOR_ROUTE, { sourceTopicId })));
    },
  };
};

class PureNewPullRequestPage extends React.Component<Props> {
  handleCreatePullRequest = (
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
  ): void => {
    const { createPullRequest, currentUserId } = this.props;
    if (currentUserId == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
    createPullRequest(message, sourceTopicId, targetTopicId, currentUserId);
  };

  renderNewPullRequestPage = (topic: topics.model.Topic): React.Node => {
    return (
      <AuthWrapper>
        <ContainerPageWrapper>
          <NewPullRequestCard
            sourceTopicId={topic.id}
            targetTopicId={topic.upstreamTopicId}
            onCreatePullRequest={this.handleCreatePullRequest}
          />
        </ContainerPageWrapper>
      </AuthWrapper>
    );
  };

  render(): React.Node {
    const { match: { params: { topicId } } } = this.props;

    if (topicId == null) return null;

    return (
      <FetchWrapper
        render={this.renderNewPullRequestPage}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={topics.actions.fetch}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const NewPullRequestPage = connect(mapStateToProps, mapDispatchToProps)(PureNewPullRequestPage);

export { PureNewPullRequestPage };
export default NewPullRequestPage;
