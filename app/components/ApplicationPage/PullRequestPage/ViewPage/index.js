// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import FetchWrapper from 'components/FetchWrapper';
import { type ModulesAction, type AppState } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';
import users from 'modules/users';

type PassedProps = {|
  pullRequestId: string,
|};

type StateProps = {|
  currentUserId: ?string,
|};

type DispatchProps = {|
  fetchUser: (id: string) => void,
|};

type Props = {| ...RouterProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const { AuthWrapper } = platform.components;
const { View } = pullRequests.components;

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    fetchUser: (id: string): void => {
      dispatch(users.actions.fetch(id));
    },
  };
};

class PureViewPage extends React.Component<Props> {
  renderViewPage = (currentUser: users.model.User): React.Node => {
    const { match: { params: { pullRequestId } } } = this.props;

    return (pullRequestId == null) ? null : (
      <div data-test-id="view-page">
        <AuthWrapper>
          <ContainerPageWrapper>
            <View
              pullRequestId={pullRequestId}
              currentUser={currentUser}
            />
          </ContainerPageWrapper>
        </AuthWrapper>
      </div>
    );
  };

  render(): React.Node {
    const { currentUserId } = this.props;

    return (
      <FetchWrapper
        render={this.renderViewPage}
        renderPropsAndState={this.props}
        fetchId={currentUserId}
        fetchAction={users.actions.fetch}
        fetchedPropSelector={users.selectors.getById}
      />
    );
  }
}

const ViewPage = connect(mapStateToProps, mapDispatchToProps)(PureViewPage);

export { PureViewPage };
export default ViewPage;
