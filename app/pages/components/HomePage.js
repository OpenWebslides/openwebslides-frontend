// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Grid, Button } from 'semantic-ui-react';
import feedItems from 'modules/feed-items';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';

import { FETCH_FEED } from 'modules/feed-items/actionTypes';

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

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestFeed: (): void => {
      dispatch({
        type: FETCH_FEED,
      });
    },
  };
};


const SocialFeed = feedItems.components.FeedCollection;

const PureHomePage = (props: Props): React.Node => {
  const {
    t,
    feedItemIds,
    handleRequestFeed,
  } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:home.title')}</h1>
            <Button onClick={handleRequestFeed}>Request feed</Button>
            <SocialFeed feedItemIds={feedItemIds} />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};


const HomePage = connect(mapStateToProps, mapDispatchToProps)(translate()(PureHomePage));

export { PureHomePage };
export default HomePage;
