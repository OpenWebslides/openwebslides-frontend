// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { push } from 'connected-react-router';
import { Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import InlineMarkdown from 'components/InlineMarkdown';
import topics from 'modules/topics';
import users from 'modules/users';

import actions from '../../../../actions';
import * as m from '../../../../model';

type PassedProps = {|
  alert: m.ForkedAlert,
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

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

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

      dispatch(push(makeRoute(TOPIC_VIEWER_ROUTE, { topicId: alert.topicId })));
    },
  };
};

class PureForkedAlert extends React.Component<Props> {
  componentDidMount(): void {
    const { user, fetchUser, topic, fetchTopic } = this.props;
    if (user == null) fetchUser();
    if (topic == null) fetchTopic();
  }

  render(): React.Node {
    const { t, alert, user, topic, onClickAlert } = this.props;

    if (user == null || topic == null) return null;

    return (
      <Grid onClick={onClickAlert} data-test-id="alert">
        <Grid.Column width={1} verticalAlign="middle">
          <Icon name="copy outline" />
        </Grid.Column>
        <Grid.Column width={13}>
          <InlineMarkdown
            text={t('alerts:menu.forked', { userName: user.name, topicTitle: topic.title })}
          />
          <p className="date" title={moment(alert.timestamp).format('LLLL')}>
            {moment(alert.timestamp).fromNow()}
          </p>
        </Grid.Column>
      </Grid>
    );
  }
}

const ForkedAlert = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(PureForkedAlert));

export { PureForkedAlert };
export default ForkedAlert;
