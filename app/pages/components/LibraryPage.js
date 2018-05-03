// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import topics from 'modules/topics';
import authentication from 'modules/authentication';

import Page from '../Page';

const { getAllTopicIdsByUserId } = topics.selectors;
const { getAccount } = authentication.selectors;
const { CardCollection } = topics.components;
const { getAllByUserId } = topics.actions;

type StateProps = {
  topicIds: Array<Identifier>,
  userId: Identifier,
};

type DispatchProps = {
  handleRequestTopics: (userId: Identifier) => void,
};

type Props = CustomTranslatorProps & StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => {
  const account = getAccount(state);

  // TODO: does this need null checks or is it impossible to access when not logged in?
  const CURRENT_USER = account != null ? account.id : 'jantje1234';

  return {
    topicIds: getAllTopicIdsByUserId(state, CURRENT_USER),
    userId: CURRENT_USER,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestTopics: (userId: Identifier): void => {
      dispatch(getAllByUserId(userId));
    },
  };
};

class PureLibraryPage extends React.Component<Props, State> {
  componentDidMount = (): void => {
    this.props.handleRequestTopics(this.props.userId);
  }

  render = (): React.Node => {
    const {
      t,
      topicIds,
    } = this.props;

    return (
      <Page>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <h1>{t('pages:library.title')}</h1>
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
              <Link to="/topics/new">
                <Button as="span">
                  {t('common:link.newtopic')}
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <CardCollection topicIds={topicIds} />
          </Grid.Row>
        </Grid>
      </Page>
    );
  }
}

const LibraryPage = connect(mapStateToProps, mapDispatchToProps)(translate()(PureLibraryPage));

export { PureLibraryPage };
export default LibraryPage;

