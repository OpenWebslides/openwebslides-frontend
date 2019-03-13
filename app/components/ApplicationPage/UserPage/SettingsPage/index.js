// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import { UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';
import users from 'modules/users';

type StateProps = {|
  currentUserId: ?string,
|};

type Props = {| ...StateProps |};

const { Settings } = users.components;

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const PureSettingsPage = (props: Props): React.Node => {
  const { currentUserId } = props;
  if (currentUserId == null) throw new UnsupportedOperationError(`This shouldn't happen.`);

  return (
    <ContainerPageWrapper>
      <Settings userId={currentUserId} />
    </ContainerPageWrapper>
  );
};

const SettingsPage = connect(mapStateToProps)(PureSettingsPage);

export { PureSettingsPage };
export default SettingsPage;
