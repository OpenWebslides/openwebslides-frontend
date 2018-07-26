// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { translate, type TranslatorProps } from 'react-i18next';
import moment from 'moment';
import { Feed, Image } from 'semantic-ui-react';

import { USER_PROFILE_BY_ID_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import { type State } from 'types/state';
import { type Action } from 'types/action';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../model';
import { getById } from '../selectors';

type PassedProps = {|
  eventId: string,
|};

type StateProps = {|
  event: m.Event,
  user: ?users.model.User,
  topic: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: (string) => void,
  fetchUser: (string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { eventId } = props;
  const event = getById(state, eventId);
  const topic = topics.selectors.getById(state, { id: event.topicId });
  const user = users.selectors.getById(state, { id: event.userId });

  return {
    event,
    user,
    topic,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    fetchTopic: (id: string): void => {
      dispatch(
        topics.actions.get(id),
      );
    },
    fetchUser: (id: string): void => {
      dispatch(
        users.actions.fetch(id),
      );
    },
  };
};

class PureEventWrapper extends React.Component<Props, State> {
  componentDidMount = (): void => {
    const {
      event,
      user,
      topic,
      fetchTopic,
      fetchUser,
    } = this.props;

    // Request missing data from API
    if (topic == null) {
      fetchTopic(event.topicId);
    }

    if (user == null || user.email === '') {
      fetchUser(event.userId);
    }
  };

  render = (): React.Node => {
    const {
      t,
      event,
      user,
      topic,
    } = this.props;

    // Prevent rendering when resources are still loading
    if (topic == null || user == null) {
      return null;
    }

    return (
      <Feed.Event>
        <Feed.Label>
          <Link to={makeRoute(USER_PROFILE_BY_ID_ROUTE, { userId: user.id })}>
            <Image src={users.lib.getGravatarSrc(user, 200)} bordered={true} />
          </Link>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Link as="Feed.User" to={makeRoute(USER_PROFILE_BY_ID_ROUTE, { userId: user.id })}>
              {user.name}
            </Link>
            &nbsp;
            {t('feed:event.action', { context: `${event.predicate}` })}
            &nbsp;
            <Link className="secondaryLink" to={`${TOPIC_EDITOR_ROUTE}/${topic.id}`}>
              {topic.title}
            </Link>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {
                moment(event.timestamp).fromNow()
              }
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  };
}

const EventWrapper = connect(mapStateToProps, mapDispatchToProps)(translate()(PureEventWrapper));

export { PureEventWrapper };
export default EventWrapper;
