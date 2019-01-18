// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TOPIC_VIEWER_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';

import * as m from '../../../model';
import UserComment from '../UserComment';

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

class PureSubmitComment extends React.Component<Props> {
  componentDidMount(): void {
    const { pullRequest, source, target, fetchTopic } = this.props;
    if (source == null) fetchTopic(pullRequest.sourceTopicId);
    if (target == null) fetchTopic(pullRequest.targetTopicId);
  }

  render(): React.Node {
    const { pullRequest, source, target } = this.props;

    if (source == null || target == null) return null;

    return (
      <UserComment userId={pullRequest.userId} timestamp={pullRequest.timestamp}>
        <p>
          <Trans
            i18nKey="pullRequests:comments.submit.text"
            values={{
              count: 0, // TODO
              sourceTopicTitle: source.title,
              targetTopicTitle: target.title,
            }}
          >
            <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: source.id })}>
              source
            </Link>
            <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: target.id })}>
              source
            </Link>
          </Trans>
        </p>
        <blockquote>
          <em>{pullRequest.message}</em>
        </blockquote>
      </UserComment>
    );
  }
}

const SubmitComment = connect(mapStateToProps, mapDispatchToProps)(
  withNamespaces()(PureSubmitComment),
);

export { PureSubmitComment };
export default SubmitComment;
