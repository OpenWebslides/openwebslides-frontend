// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import _ from 'lodash';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import moment from 'moment';
import { getDisplayNameAndEmailById } from 'modules/users/selectors';
import { getTitleById } from 'modules/topics/selectors';
import type { DisplayNameAndEmailType } from 'modules/users/model';
import { GRAVATAR_SIZE_SMALL } from 'modules/users/constants';
import md5 from 'blueimp-md5';

import { Feed } from 'semantic-ui-react';

import type { FeedItemType } from '../model';

import { predicateTypes } from '../model';
import { getById } from '../selectors';


type PassedProps = {
  feedItemId: Identifier,
};

type StateProps = {
  feedItem: FeedItemType,
  displayNameAndEmail: DisplayNameAndEmailType,
  topicTitle: string,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const feedItem = getById(state, props.feedItemId);
  return {
    feedItem,
    displayNameAndEmail: getDisplayNameAndEmailById(state, feedItem.userId),
    topicTitle: getTitleById(state, feedItem.topicId),
  };
};

const PureFeedItem = (props: Props): React.Node => {
  const {
    t,
    feedItem,
    displayNameAndEmail,
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

  const imageHash = md5(_.trim(displayNameAndEmail.email).toLowerCase());

  return (
    <Feed.Event>
      <Feed.Label>
        <img src={`https://www.gravatar.com/avatar/${imageHash}?s=${GRAVATAR_SIZE_SMALL}`} alt="profile" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{displayNameAndEmail.displayName}&nbsp;</Feed.User>
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
