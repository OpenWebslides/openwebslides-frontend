// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Translation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Feed, Image } from 'semantic-ui-react';
import moment from 'moment';

import { type TFunction } from 'types/i18next';
import { USER_PROFILE_BY_ID_ROUTE, TOPIC_VIEWER_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../model';

type PassedProps = {|
  feedItem: m.FeedItem,
|};

type StateProps = {|
  topic: ?topics.model.Topic,
  user: ?users.model.User,
|};

type DispatchProps = {|
  fetchTopic: () => void,
  fetchUser: () => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { feedItem } = props;

  return {
    topic: topics.selectors.getById(state, { id: feedItem.topicId }),
    user: users.selectors.getById(state, { id: feedItem.userId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { feedItem } = props;

  return {
    fetchTopic: (): void => {
      dispatch(topics.actions.fetch(feedItem.topicId));
    },
    fetchUser: (): void => {
      dispatch(users.actions.fetch(feedItem.userId));
    },
  };
};

class PureFeedItem extends React.Component<Props> {
  componentDidMount(): void {
    const { topic, user, fetchTopic, fetchUser } = this.props;
    if (topic == null) fetchTopic();
    if (user == null) fetchUser();
  }

  render(): React.Node {
    const { feedItem, topic, user } = this.props;

    if (topic == null || user == null) {
      return null;
    }
    else {
      return (
        <Translation>
          {(t: TFunction): React.Node => (
            <Feed.Event data-test-id="feed-item">
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
                  {` ${t(`feedItems:actionForType.${feedItem.type}`)} `}
                  <Link className="secondaryLink" to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id })}>
                    {topic.title}
                  </Link>
                  <Feed.Date title={moment(feedItem.timestamp).format('LLLL')}>
                    {moment(feedItem.timestamp).fromNow()}
                  </Feed.Date>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          )}
        </Translation>
      );
    }
  }
}

const FeedItem = connect(mapStateToProps, mapDispatchToProps)(PureFeedItem);

export { PureFeedItem };
export default FeedItem;
