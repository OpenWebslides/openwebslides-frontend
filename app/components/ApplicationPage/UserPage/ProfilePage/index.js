// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, type ContextRouter as RouterProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import * as paths from 'config/routes';
import { type State } from 'types/state';
import { UnsupportedOperationError } from 'errors';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import feedItems from 'modules/feedItems';
import platform from 'modules/platform';
import users from 'modules/users';

type StateProps = {|
  currentUserId: ?string,
|};

type Props = {| ...RouterProps, ...StateProps |};

const { Feed } = feedItems.components;
const { UserProfile } = users.components;

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

class PureProfilePage extends React.Component<Props> {
  renderProfileForPassedId = (routerProps: RouterProps): React.Node => {
    const { currentUserId } = this.props;
    const { match } = routerProps;
    const userId = match.params.userId;

    return (
      <UserProfile userId={userId} isCurrentUser={userId === currentUserId} />
    );
  };

  renderProfileForCurrentUserId = (): React.Node => {
    const { currentUserId } = this.props;
    if (currentUserId == null) throw new UnsupportedOperationError(`This shouldn't happen.`);

    return (
      <UserProfile userId={currentUserId} isCurrentUser={true} />
    );
  };

  render(): React.Node {
    return (
      <ContainerPageWrapper>
        <Grid stackable={true} celled="internally">
          <Grid.Column width={12}>
            <Switch>
              <Route path={paths.USER_PROFILE_BY_ID_ROUTE} render={this.renderProfileForPassedId} />
              <Route path={paths.USER_PROFILE_ROUTE} render={this.renderProfileForCurrentUserId} />
            </Switch>
          </Grid.Column>
          <Grid.Column width={4}>
            <Feed />
          </Grid.Column>
        </Grid>
      </ContainerPageWrapper>
    );
  }
}

const ProfilePage = connect(mapStateToProps)(withRouter(PureProfilePage));

export { PureProfilePage };
export default ProfilePage;
