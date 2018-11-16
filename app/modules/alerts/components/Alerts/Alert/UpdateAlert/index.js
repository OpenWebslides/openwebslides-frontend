// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { push } from 'connected-react-router';
import { Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import InlineMarkdown from 'components/InlineMarkdown';
import topics from 'modules/topics';

import actions from '../../../../actions';
import * as m from '../../../../model';

type PassedProps = {|
  alert: m.UpdateAlert,
|};

type StateProps = {|
  topic: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: () => void,
  onClickAlert: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { alert } = props;

  return {
    topic: topics.selectors.getById(state, { id: alert.topicId }),
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
    onClickAlert: (): void => {
      if (!alert.read) dispatch(actions.markAsRead(alert.id));

      dispatch(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: alert.topicId })));
    },
  };
};

class PureUpdateAlert extends React.Component<Props> {
  componentDidMount(): void {
    const { topic, fetchTopic } = this.props;
    if (topic == null) fetchTopic();
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
            text={t('alerts:menu.updated', { count: alert.count, topicTitle: topic.title })}
          />
          <p className="date">{moment(alert.timestamp).fromNow()}</p>
        </Grid.Column>
      </Grid>
    );
  }
}

const UpdateAlert = connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(PureUpdateAlert));

export { PureUpdateAlert };
export default UpdateAlert;
