// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { type ModulesAction, type AppState } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';
import InlineMarkdown from 'components/InlineMarkdown';
import pullRequests from 'modules/pullRequests';
import topics from 'modules/topics';

import * as m from '../../../../model';

type PassedProps = {|
  alert: m.PullRequestAlert,
|};

type StateProps = {|
  pullRequest: ?pullRequests.model.PullRequest,
  topicId: ?string,
|};

type DispatchProps = {|
  fetchPullRequest: () => void,
  onClickAlert: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
  const { alert } = props;

  const pullRequest = pullRequests.selectors.getById(state, { id: alert.pullRequestId });

  return {
    pullRequest,
    topicId: pullRequest == null ? null : pullRequest.targetTopicId,
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
    onClickAlert: (): void => {
      // TODO: mark alert as read
      // TODO: redirect to PR route
    },
  };
};

class PurePullRequestAlert extends React.Component<Props> {
  componentDidMount(): void {
    const { pullRequest, fetchPullRequest } = this.props;
    if (pullRequest == null) fetchPullRequest();
  }

  renderAlert = (topic: topics.model.Topic): React.Node => {
    const { t, alert, onClickAlert } = this.props;

    if (topic == null) return null;

    const iconName = {
      [m.alertTypes.PR_SUBMITTED]: 'question',
      [m.alertTypes.PR_ACCEPTED]: 'check',
      [m.alertTypes.PR_REJECTED]: 'times',
    };

    return (
      <Grid onClick={onClickAlert} data-test-id="alert">
        <Grid.Column width={1} verticalAlign="middle">
          <Icon name={`${iconName[alert.type]} circle outline`} />
        </Grid.Column>
        <Grid.Column width={13}>
          <InlineMarkdown
            text={t(`alerts:actionForType.${alert.type}`, { userName: 'TODO', topicTitle: topic.title })}
          />
          <p className="date">{moment(alert.timestamp).fromNow()}</p>
        </Grid.Column>
      </Grid>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return topicId === null ? null : (
      <FetchWrapper
        render={this.renderAlert}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={topics.actions.fetch}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const PullRequestAlert = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(PurePullRequestAlert));

export { PurePullRequestAlert };
export default PullRequestAlert;
