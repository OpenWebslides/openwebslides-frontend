// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import type { CustomTranslatorProps } from 'types/translator';
import topics from 'modules/topics';

import Page from '../Page';

const { CardCollection } = topics.components;

type Props = CustomTranslatorProps;

const PureLibraryPage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page needsAuth={true}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <h1>{t('global:title.library')}</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Link to="/topics/new">
              <Button as="span">
                {t('global:title.createNewTopic')}
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <CardCollection />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Page>
  );
};

const LibraryPage = translate()(PureLibraryPage);

export { PureLibraryPage };
export default LibraryPage;
