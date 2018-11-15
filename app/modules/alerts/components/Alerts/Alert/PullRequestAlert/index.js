// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { type ModulesAction, type AppState } from 'types/redux';
import InlineMarkdown from 'components/InlineMarkdown';
import pullRequests from 'modules/pullRequests';
import topics from 'modules/topics';

import * as m from '../../../../model';

type PassedProps = {|
  alert: m.PullRequestAlert,
|};

type StateProps = {|
  pullRequest: ?pullRequests.model.PullRequest,
  topic: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchPullRequest: () => void,
  fetchTopic: (topicId: string) => void,
  onClickAlert: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
  const { pullRequest, alert } = props;

  return {
    pullRequest: pullRequests.selectors.getById(state, { id: alert.pullRequestId }),
    topic: pullRequest == null ? null : topics.selectors.getById(state, { id: pullRequest.targetTopicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { alert } = props;

  return {
    fetchPullRequest: (): void => {
      dispatch(pullRequests.actions.fetch(alert.pullRequestId));
    },
    fetchTopic: (topicId: string): void => {
      dispatch(topics.actions.fetch(topicId));
    },
    onClickAlert: (): void => {
      // TODO: mark alert as read
      // TODO: redirect to PR route
    },
  };
};

class PurePullRequestAlert extends React.Component<Props> {
  componentDidMount(): void {
    const { pullRequest, topic, fetchPullRequest, fetchTopic } = this.props;
    if (pullRequest == null) fetchPullRequest();
    if (pullRequest !== null && topic == null) fetchTopic(pullRequest.targetTopicId);
  }

  render(): React.Node {
    const { t, alert, topic, onClickAlert } = this.props;

    if (topic == null) return null;

    return (
      <Grid onClick={onClickAlert} data-test-id="alert">
        <Grid.Column width={1} verticalAlign="middle">
          <Icon name="arrow alternate circle up outline" />
        </Grid.Column>
        <Grid.Column width={13}>
          <InlineMarkdown
            text={t(`alerts:menu.${alert.type}`, { topicTitle: topic.title })}
          />
          <p className="date">{moment(alert.timestamp).fromNow()}</p>
        </Grid.Column>
      </Grid>
    );
  }
}

const PullRequestAlert = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(PurePullRequestAlert));

export { PurePullRequestAlert };
export default PullRequestAlert;
