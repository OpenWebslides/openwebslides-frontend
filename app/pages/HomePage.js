// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import ContainerPage from 'core-components/ContainerPage';
import feed from 'modules/feed';
import platform from 'modules/platform';

const { Feed } = feed.components;
const { AuthWrapper } = platform.components;

type Props = TranslatorProps;

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <AuthWrapper>
      <ContainerPage>
        <Grid.Row>
          <Grid padded="vertically">
            <Grid.Column>
              <h1>{t('global:title.recentActivity')}</h1>
              <Feed />
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </ContainerPage>
    </AuthWrapper>
  );
};

const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
