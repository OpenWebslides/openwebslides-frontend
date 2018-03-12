// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Segment, Grid, Menu } from 'semantic-ui-react';

import home from 'modules/home';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };

const HomeContainer = home.components.components.homecontainer;

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid stretched={true}>
        <Grid.Column stretched={true} width={2}>
          <Menu vertical={true} fluid={true}>
            <Menu.Header>
              <Segment vertical={true}>
                <Link to="/topics">{t('common:link.topics')}</Link>
              </Segment>
              <Segment vertical={true}>
                <Link to="/Library">{t('common:link.library')}</Link>
              </Segment>
            </Menu.Header>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched={true} width={14}>
          <HomeContainer />
        </Grid.Column>
      </Grid>
    </Page>
  );
};


const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
