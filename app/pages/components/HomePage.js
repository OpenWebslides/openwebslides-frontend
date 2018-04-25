// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Grid } from 'semantic-ui-react';
import feedItems from 'modules/feed-items';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';

import Page from '../Page';

const { getAll } = feedItems.selectors;

type StateProps = {
  feedItemIds: Array<Identifier>,
};

type DispatchProps = {
  handleRequestFeed: () => void,
};

type Props = CustomTranslatorProps & StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    feedItemIds: getAll(state).map((feedItem) => feedItem.id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestFeed: (): void => {
      dispatch(feedItems.actions.fetch());
    },
  };
};

const SocialFeed = feedItems.components.FeedCollection;

class PureHomePage extends React.Component<Props, State> {
  componentDidMount = (): void => {
    this.props.handleRequestFeed();
  }

  render = (): React.Node => {
    const {
      t,
      feedItemIds,
    } = this.props;

    return (
      <Page>
        <Grid.Row>
          <Grid padded="vertically">
            <Grid.Column>
              <h1>{t('pages:home.title')}</h1>
              <SocialFeed feedItemIds={feedItemIds} />
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </Page>
    );
  }
}


const HomePage = connect(mapStateToProps, mapDispatchToProps)(translate()(PureHomePage));

export { PureHomePage };
export default HomePage;
