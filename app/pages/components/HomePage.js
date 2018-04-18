// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import feedItems from 'modules/feed-items';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';

import Page from '../Page';

type StateProps = {
  feedItemIds: Array<Identifier>,
};

type Props = CustomTranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    feedItemIds: feedItems.selectors.getAll(state).map((feedItem) => feedItem.id),
  };
};

const SocialFeed = feedItems.components.FeedCollection;

const PureHomePage = (props: Props): React.Node => {
  const {
    t,
    feedItemIds,
  } = props;

  return (
    <Page>
      <h1>{t('pages:home.title')}</h1>
      <SocialFeed feedItemIds={feedItemIds} />
    </Page>
  );
};


const HomePage = connect(mapStateToProps)(translate()(PureHomePage));

export { PureHomePage };
export default HomePage;
