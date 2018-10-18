// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { type ModulesAction, type AppState } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import { CorruptedInternalStateError } from 'errors';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';

type StateProps = {|
  currentUserId: ?string,
|};

type DispatchProps = {|
  submitPullRequest: (currentUserId: string, topicId: string) => void,
|};

type Props = {| ...StateProps, ...DispatchProps, ...RouterProps |};

const { AuthWrapper } = platform.components;
const { PullRequest } = pullRequests.components;

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    submitPullRequest: (currentUserId: string, topicId: string): void => {},
  };
};

class PurePullRequestPage extends React.Component<Props> {
  handleSubmitPullRequest = (topicId: string): void => {
    const { submitPullRequest, currentUserId } = this.props;
    if (currentUserId == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);
    submitPullRequest(currentUserId, topicId);
  };

  render(): React.Node {
    const { match: { params: { topicId } } } = this.props;

    return (topicId == null) ? null : (
      <AuthWrapper>
        <ContainerPageWrapper>
          <PullRequest topicId={topicId} onSubmitPullRequest={this.handleSubmitPullRequest} />
        </ContainerPageWrapper>
      </AuthWrapper>
    );
  }
}

const PullRequestPage = connect(mapStateToProps, mapDispatchToProps)(PurePullRequestPage);

export { PurePullRequestPage };
export default PullRequestPage;
