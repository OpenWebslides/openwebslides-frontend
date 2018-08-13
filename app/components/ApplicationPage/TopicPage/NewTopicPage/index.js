// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type State } from 'types/state';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';

type StateProps = {|
  currentUserId: ?string,
|};

type Props = {| ...StateProps |};

const { AuthWrapper } = platform.components;
const { NewTopicCard } = topics.components;

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const PureNewTopicPage = (props: Props): React.Node => {
  const { currentUserId } = props;

  return (
    <AuthWrapper>
      <ContainerPageWrapper>
        { (currentUserId == null) ? null : <NewTopicCard userId={currentUserId} />}
      </ContainerPageWrapper>
    </AuthWrapper>
  );
};

const NewTopicPage = connect(mapStateToProps)(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;
