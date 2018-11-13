// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { push } from 'connected-react-router';

import { type ModulesAction, type AppState } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import { CorruptedInternalStateError } from 'errors';
import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';

type StateProps = {|
  currentUserId: ?string,
|};

type DispatchProps = {|
  createPullRequest: (currentUserId: string, topicId: string, message: string) => void,
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
    createPullRequest: (currentUserId: string, topicId: string, message: string): void => {
      // TODO: dispatch create new pull request action
      console.log('dispatch(pullRequests.actions.create)');
      dispatch(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId })));
    },
  };
};

class PureNewPullRequestPage extends React.Component<Props> {
  handleCreatePullRequest = (topicId: string, message: string): void => {
    const { createPullRequest, currentUserId } = this.props;
    if (currentUserId == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
    createPullRequest(currentUserId, topicId, message);
  };

  render(): React.Node {
    const { match: { params: { topicId } } } = this.props;

    return (topicId == null) ? null : (
      <AuthWrapper>
        <ContainerPageWrapper>
          <NewPullRequestCard
            topicId={topicId}
            onCreatePullRequest={this.handleCreatePullRequest}
            data-test-id="new-pull-request-page-card"
          />
        </ContainerPageWrapper>
      </AuthWrapper>
    );
  }
}

const NewPullRequestPage = connect(mapStateToProps, mapDispatchToProps)(PureNewPullRequestPage);

export { PureNewPullRequestPage };
export default NewPullRequestPage;
