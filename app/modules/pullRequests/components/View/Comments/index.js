// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Comment, Divider } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';
import { TOPIC_VIEWER_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import AcceptPullRequestModal from 'modals/AcceptPullRequestModal';
import RejectPullRequestModal from 'modals/RejectPullRequestModal';
import topics from 'modules/topics';
import users from 'modules/users';
import policies from 'modules/policies';

import * as m from '../../../model';
import actions from '../../../actions';

import ReviewButtons from './ReviewButtons';
import State from './State';

type PassedProps = {|
  pullRequest: m.PullRequest,
|};

type StateProps = {|
  source: ?topics.model.Topic,
  target: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: (id: string) => void,
  onAccept: (pullRequestId: string, message: ?string) => void,
  onReject: (pullRequestId: string, message: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

type ComponentState = {|
  isAcceptModalOpen: boolean,
  isRejectModalOpen: boolean,
|};

const { UserComment } = users.components;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { pullRequest } = props;

  return {
    source: topics.selectors.getById(state, { id: pullRequest.sourceTopicId }),
    target: topics.selectors.getById(state, { id: pullRequest.targetTopicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {
    fetchTopic: (id: string): void => {
      dispatch(topics.actions.fetch(id));
    },
    onAccept: (pullRequestId: string, message: ?string): void => {
      dispatch(actions.accept(pullRequestId, message));
    },
    onReject: (pullRequestId: string, message: string): void => {
      dispatch(actions.reject(pullRequestId, message));
    },
  };
};

const { PolicyWrapper } = policies.components;

class PureComments extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isAcceptModalOpen: false,
    isRejectModalOpen: false,
  };

  componentDidMount(): void {
    const { pullRequest, source, target, fetchTopic } = this.props;

    if (source == null) fetchTopic(pullRequest.sourceTopicId);
    if (target == null) fetchTopic(pullRequest.targetTopicId);
  }

  showAcceptModal = (): void => {
    this.setState({ isAcceptModalOpen: true });
  };

  showRejectModal = (): void => {
    this.setState({ isRejectModalOpen: true });
  };

  handleAcceptModalSubmit = (message: ?string): void => {
    const { pullRequest, onAccept } = this.props;

    onAccept(pullRequest.id, message);
    this.handleFeedbackModalCancel();
  };

  handleRejectModalSubmit = (message: ?string): void => {
    const { pullRequest, onReject } = this.props;

    onReject(pullRequest.id, message);
    this.handleFeedbackModalCancel();
  };

  handleFeedbackModalCancel = (): void => {
    this.setState({ isAcceptModalOpen: false, isRejectModalOpen: false });
  };

  render(): React.Node {
    const { t, pullRequest, source, target } = this.props;
    const { isAcceptModalOpen, isRejectModalOpen } = this.state;

    if (source == null || target == null) return null;

    return (
      <div data-test-id="comments">
        <Comment.Group>
          <UserComment userId={pullRequest.userId} timestamp={pullRequest.timestamp}>
            <Trans
              i18nKey="pullRequests:comments.submitted"
              values={{
                updateCount: 5, // TODO
                sourceTopicTitle: source.title,
                targetTopicTitle: target.title,
              }}
            >
              <strong>0 updates</strong>
              <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: target.id })}>
                target
              </Link>
              <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: source.id })}>
                source
              </Link>
            </Trans>
            <blockquote data-test-id="comments-message">
              <em>{pullRequest.message}</em>
            </blockquote>
          </UserComment>

          <State pullRequest={pullRequest} source={source} target={target} />

          {(pullRequest.state === m.pullRequestStates.READY ? (
            <PolicyWrapper policy={policies.policies.TopicPolicy} record={target} action="update">
              <Divider hidden={true} />
              <Comment data-test-id="comments-review-buttons">
                <Comment.Avatar />
                <Comment.Content>
                  <Comment.Author>
                    {t('common:button.review')}
                  </Comment.Author>
                  <Comment.Text>
                    <p>{t('pullRequests:comments.action')}</p>
                    <Divider hidden={true} />
                    <ReviewButtons
                      onAccept={this.showAcceptModal}
                      onReject={this.showRejectModal}
                    />
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </PolicyWrapper>
          ) : null)}
        </Comment.Group>

        <AcceptPullRequestModal
          source={source}
          target={target}
          isOpen={isAcceptModalOpen}
          onSubmit={this.handleAcceptModalSubmit}
          onCancel={this.handleFeedbackModalCancel}
        />

        <RejectPullRequestModal
          source={source}
          target={target}
          isOpen={isRejectModalOpen}
          onSubmit={this.handleRejectModalSubmit}
          onCancel={this.handleFeedbackModalCancel}
        />
      </div>
    );
  }
}

const Comments = connect(mapStateToProps, mapDispatchToProps)(
  withNamespaces()(PureComments),
);

export { PureComments };
export default Comments;
