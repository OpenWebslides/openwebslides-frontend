// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Grid } from 'semantic-ui-react';
import feed from 'modules/feed';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';

import Page from '../Page';

const { getAll } = feed.selectors;
const SocialFeed = feed.components.Feed;

type StateProps = {
  eventIds: Array<Identifier>,
};

type DispatchProps = {
  handleRequestFeed: () => void,
};

type Props = CustomTranslatorProps & StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    eventIds: getAll(state).map((event) => event.id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestFeed: (): void => {
      dispatch(feed.actions.fetch());
    },
  };
};

class PureHomePage extends React.Component<Props, State> {
  componentDidMount = (): void => {
    this.props.handleRequestFeed();
  }

  render = (): React.Node => {
    const {
      t,
      eventIds,
    } = this.props;

    return (
      <Page>
        <Grid.Row>
          <Grid padded="vertically">
            <Grid.Column>
              <h1>{t('pages:home.title')}</h1>
              <SocialFeed eventIds={eventIds} />
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
