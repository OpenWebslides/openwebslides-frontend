// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';

import { type State } from 'types/state';
import { type Identifier } from 'types/model';
import { UnsupportedOperationError } from 'errors';
import ContainerPage from 'core-components/ContainerPage';
import platform from 'modules/platform';
import topics from 'modules/topics';

const { NewTopicCard } = topics.components;

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

const PureNewTopicPage = (props: Props): React.Node => {
  const { t, currentUserId } = props;

  return (
    <ContainerPage>
      <React.Fragment>
        <h1>{t('global:title.createNewTopic')}</h1>
        <NewTopicCard userId={currentUserId} />
      </React.Fragment>
    </ContainerPage>
  );
};

const NewTopicPage = connect(mapStateToProps)(translate()(PureNewTopicPage));

export { PureNewTopicPage };
export default NewTopicPage;
