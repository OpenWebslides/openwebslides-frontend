// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Message, Icon } from 'semantic-ui-react';
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

type Props = {| ...TranslatorProps, ...StateProps, ...DispatchProps, ...RouterProps |};

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
      dispatch(pullRequests.actions.create(message, sourceTopicId, targetTopicId, currentUserId));
      dispatch(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: sourceTopicId })));
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
    const { t, currentUserId } = this.props;

    if (currentUserId == null) return null;

    return (
      <AuthWrapper>
        <ContainerPageWrapper>
          {(topic.upstreamTopicId == null)
            ? (
              <Message error={true} icon={true} data-test-id="new-pull-request-card-no-upstream">
                <Icon name="exclamation triangle" />
                <Message.Content>
                  <Message.Header>{t('pullRequests:newPullRequestCard.noUpstream.title')}</Message.Header>
                  <p>{t('pullRequests:newPullRequestCard.noUpstream.description')}</p>
                </Message.Content>
              </Message>
            ) : (
              <NewPullRequestCard
                sourceTopicId={topic.id}
                targetTopicId={topic.upstreamTopicId}
                onCreatePullRequest={this.handleCreatePullRequest}
              />
            )}
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

const NewPullRequestPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(PureNewPullRequestPage));

export { PureNewPullRequestPage };
export default NewPullRequestPage;
