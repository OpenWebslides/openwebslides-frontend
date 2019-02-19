// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Translation } from 'react-i18next';
import { push } from 'connected-react-router';
import { Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { type TFunction } from 'types/i18next';
import { PULL_REQUEST_VIEW_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import InlineMarkdown from 'components/InlineMarkdown';
import topics from 'modules/topics';
import users from 'modules/users';

import actions from '../../../../actions';
import * as m from '../../../../model';

type PassedProps = {|
  alert: m.PullRequestAlert,
|};

type StateProps = {|
  user: ?users.model.User,
  topic: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchUser: () => void,
  fetchTopic: () => void,
  onClickAlert: () => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
  const { alert } = props;

  return {
    user: users.selectors.getById(state, { id: alert.subjectUserId }),
    topic: topics.selectors.getById(state, { id: alert.topicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { alert } = props;

  return {
    fetchUser: (): void => {
      dispatch(users.actions.fetch(alert.subjectUserId));
    },
    fetchTopic: (): void => {
      dispatch(topics.actions.fetch(alert.topicId));
    },
    onClickAlert: (): void => {
      if (!alert.read) dispatch(actions.markAsRead(alert.id));

      dispatch(push(makeRoute(PULL_REQUEST_VIEW_ROUTE, { pullRequestId: alert.pullRequestId })));
    },
  };
};

class PurePullRequestAlert extends React.Component<Props> {
  componentDidMount(): void {
    const { user, fetchUser, topic, fetchTopic } = this.props;
    if (user == null) fetchUser();
    if (topic == null) fetchTopic();
  }

  render(): React.Node {
    const { alert, user, topic, onClickAlert } = this.props;

    if (user == null || topic == null) return null;

    const iconName = {
      [m.alertTypes.PR_SUBMITTED]: 'question',
      [m.alertTypes.PR_ACCEPTED]: 'check',
      [m.alertTypes.PR_REJECTED]: 'times',
      [m.alertTypes.TOPIC_FORKED]: '', // #TODO
      [m.alertTypes.TOPIC_UPDATED]: '', // #TODO
    };

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Grid onClick={onClickAlert} data-test-id="alert">
            <Grid.Column width={1} verticalAlign="middle">
              <Icon name={`${iconName[alert.type]} circle outline`} />
            </Grid.Column>
            <Grid.Column width={13}>
              <InlineMarkdown
                text={t(`alerts:actionForType.${alert.type}`, { userName: user.name, topicTitle: topic.title })}
              />
              <p className="date" title={moment(alert.timestamp).format('LLLL')}>
                {moment(alert.timestamp).fromNow()}
              </p>
            </Grid.Column>
          </Grid>
        )}
      </Translation>
    );
  }
}

const PullRequestAlert = connect(mapStateToProps, mapDispatchToProps)(PurePullRequestAlert);

export { PurePullRequestAlert };
export default PullRequestAlert;
