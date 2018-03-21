// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import timeSince from 'lib/time-since';

import { Feed } from 'semantic-ui-react';

import professor2 from 'assets/images/avatar/professor2.jpg';

import type { FeedItemType } from '../model';
import { predicateTypes } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  feedItemId: Identifier,
};

type StateProps = {
  feedItem: FeedItemType,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    feedItem: getById(state, props.feedItemId),
  };
};

const PureFeedItem = (props: Props): React.Node => {
  const {
    t,
    feedItem,
  } = props;

  let predicate:string = '';
  switch (feedItem.predicate) {
    case predicateTypes.COMMENT: predicate = 'commented on'; break;
    case predicateTypes.CREATE: predicate = 'created'; break;
    case predicateTypes.FORK: predicate = 'forked'; break;
    case predicateTypes.DELETE: predicate = 'deleted'; break;
    default: predicate = 'acted on';
  }

  return (
    <Feed.Event>
      <Feed.Label>
        <img src={professor2} alt="profile" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{feedItem.userId}</Feed.User>
          {t('feed:feed_item.action', { action: `${predicate}`, object: 'topic ' })}
          <strong>
            &quot;
            {feedItem.topicId}
            &quot;
          </strong>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Date>{timeSince(feedItem.timestamp)}</Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

const FeedItem = connect(mapStateToProps)(translate()(PureFeedItem));

export { PureFeedItem };
export default FeedItem;
