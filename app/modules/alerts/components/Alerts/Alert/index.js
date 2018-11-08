// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown, Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { USER_PROFILE_BY_ID_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import users from 'modules/users';
import topics from 'modules/topics';

import * as m from '../../../model';

type PassedProps = {|
  alert: m.Alert,
|};

type StateProps = {|
  topic: ?topics.model.Topic,
  user: ?users.model.User,
|};

type DispatchProps = {|
  fetchTopic: () => void,
  fetchUser: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { alert } = props;

  return {
    topic: topics.selectors.getById(state, { id: alert.topicId }),
    user: users.selectors.getById(state, { id: alert.userId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { alert } = props;

  return {
    fetchTopic: (): void => {
      dispatch(topics.actions.fetch(alert.topicId));
    },
    fetchUser: (): void => {
      dispatch(users.actions.fetch(alert.userId));
    },
  };
};

class PureAlert extends React.Component<Props> {
  componentDidMount(): void {
    const { topic, user, fetchTopic, fetchUser } = this.props;
    if (topic == null) fetchTopic();
    if (user == null) fetchUser();
  }

  render(): React.Node {
    const { t, alert, topic, user } = this.props;

    if (topic == null || user == null) {
      return null;
    }
    else {
      switch (alert.type) {
        case m.alertTypes.TOPIC_UPDATED:
          return (
            <Grid>
              <Grid.Column width={1} verticalAlign="middle">
                <Icon name="arrow alternate circle up outline" />
              </Grid.Column>
              <Grid.Column width={13}>
                {t('alerts:menu.updated', { count: alert.count, topicTitle: topic.title })}
                <p className="date">{moment(alert.timestamp).fromNow()}</p>
              </Grid.Column>
            </Grid>
          );
        case m.alertTypes.PR_SUBMITTED:
          return (
            <Grid>
              <Grid.Column width={1} verticalAlign="middle">
                <Icon name="fork" />
              </Grid.Column>
              <Grid.Column width={13}>
                {t('alerts:menu.submitted', { userName: user.name, topicTitle: topic.title })}
                <p className="date">{moment(alert.timestamp).fromNow()}</p>
              </Grid.Column>
            </Grid>
          );
        default:
          return null;
      }
    }
  }
}

const Alert = connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(PureAlert));

export { PureAlert };
export default Alert;
