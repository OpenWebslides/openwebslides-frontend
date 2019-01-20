// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';
import { TOPIC_VIEWER_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import PolicyWrapper from 'components/PolicyWrapper';
import makeRoute from 'lib/makeRoute';
import { TopicPolicy } from 'lib/policies';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../model';

import ReviewButtons from './ReviewButtons';
import StateComment from './StateComment';

type PassedProps = {|
  pullRequest: m.PullRequest,
|};

type StateProps = {|
  source: ?topics.model.Topic,
  target: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: (id: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

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
  };
};

class PureComments extends React.Component<Props> {
  componentDidMount(): void {
    const { pullRequest, source, target, fetchTopic } = this.props;

    if (source == null) fetchTopic(pullRequest.sourceTopicId);
    if (target == null) fetchTopic(pullRequest.targetTopicId);
  }

  render(): React.Node {
    const { pullRequest, source, target } = this.props;

    if (source == null || target == null) return null;

    return (
      <div data-test-id="comments">
        <Comment.Group>
          <UserComment userId={pullRequest.userId} timestamp={pullRequest.timestamp}>
            <Trans
              i18nKey="pullRequests:comments.submit.text"
              values={{
                count: 0, // TODO
                sourceTopicTitle: source.title,
                targetTopicTitle: target.title,
              }}
            >
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

          <StateComment pullRequest={pullRequest} source={source} target={target} />

          <PolicyWrapper policy={TopicPolicy} record={target} action="update">
            <Comment data-test-id="comments-review-buttons">
              <Comment.Avatar />
              <Comment.Content>
                <Comment.Text>
                  <ReviewButtons />
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </PolicyWrapper>
        </Comment.Group>
      </div>
    );
  }
}

const Comments = connect(mapStateToProps, mapDispatchToProps)(
  withNamespaces()(PureComments),
);

export { PureComments };
export default Comments;
