// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import moment from 'moment';
import { getTitleById } from 'modules/topics/selectors';
import users from 'modules/users';
import Gravatar from 'core-components/gravatar/Gravatar';

import { Feed } from 'semantic-ui-react';

import type { FeedItemType } from '../model';

import { predicateTypes } from '../model';
import { getById } from '../selectors';

const getUserById = users.selectors.getById;
const { User } = users.model;
const { GRAVATAR_SIZE_SMALL } = users.constants;

type PassedProps = {
  feedItemId: Identifier,
};

type StateProps = {
  feedItem: FeedItemType,
  user: User,
  topicTitle: string,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const feedItem = getById(state, props.feedItemId);
  const user = getUserById(state, feedItem.userId);
  const topicTitle = getTitleById(state, feedItem.topicId);
  return {
    feedItem,
    user,
    topicTitle,
  };
};

const PureFeedItem = (props: Props): React.Node => {
  const {
    t,
    feedItem,
    user,
    topicTitle,
  } = props;

  let predicate:string = '';
  switch (feedItem.predicate) {
    case predicateTypes.COMMENT: predicate = 'COMMENT'; break;
    case predicateTypes.CREATE: predicate = 'CREATE'; break;
    case predicateTypes.FORK: predicate = 'FORK'; break;
    case predicateTypes.DELETE: predicate = 'DELETE'; break;
    case predicateTypes.UPDATE: predicate = 'UPDATE'; break;
    default: predicate = 'acted on';
  }

  // construct full, displayed name of user
  const lastName = user.lastName == null ? '' : user.lastName;
  const displayName = `${user.firstName} ${lastName}`;

  return (
    <Feed.Event>
      <Feed.Label>
        <Link to={`/profile/${user.id}`}>
          <Gravatar email={user.email} size={GRAVATAR_SIZE_SMALL} />
        </Link>
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Link as="Feed.User" to={`/profile/${user.id}`}>
            {displayName}&nbsp;
          </Link>
          {t('feed:feed_item.action', { context: `${predicate}` })}
          &nbsp;
          <strong>
            &quot;
            {topicTitle}
            &quot;
          </strong>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Date>{moment(feedItem.timestamp).fromNow()}</Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

const FeedItem = connect(mapStateToProps)(translate()(PureFeedItem));

export { PureFeedItem };
export default FeedItem;
