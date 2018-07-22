// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { USER_LIBRARY_NEW_TOPIC_ROUTE } from 'config/routes';
import { type State } from 'types/state';
import { type Identifier } from 'types/model';
import { UnsupportedOperationError } from 'errors';
import ContainerPage from 'core-components/ContainerPage';
import platform from 'modules/platform';
import topics from 'modules/topics';

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

const PureLibraryHomePage = (props: Props): React.Node => {
  const { t, currentUserId } = props;

  return (
    <ContainerPage>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <h1>{t('global:title.library')}</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Link to={USER_LIBRARY_NEW_TOPIC_ROUTE}>
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
    </ContainerPage>
  );
};

const LibraryHomePage = connect(mapStateToProps)(translate()(PureLibraryHomePage));

export { PureLibraryHomePage };
export default LibraryHomePage;
