// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { type State } from 'types/state';
import { type Identifier } from 'types/model';
import { UnsupportedOperationError } from 'errors';
import Page from 'core-components/Page';
import platform from 'modules/platform';
import topics from 'modules/topics';

const { AuthWrapper } = platform.components;
const { CardCollection } = topics.components;

type StateProps = {|
  currentUserId: Identifier,
|};

type Props = {| ...TranslatorProps, ...StateProps |};

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  if (userAuth == null) {
    throw new UnsupportedOperationError(`This shouldn't happen`);
  }

  return {
    currentUserId: userAuth.userId,
  };
};

const PureLibraryPage = (props: Props): React.Node => {
  const { t, currentUserId } = props;

  return (
    <Page>
      <AuthWrapper>
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
              <CardCollection userId={currentUserId} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AuthWrapper>
    </Page>
  );
};

const LibraryPage = connect(mapStateToProps)(translate()(PureLibraryPage));

export { PureLibraryPage };
export default LibraryPage;
