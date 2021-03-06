// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { type ModulesAction } from 'types/redux';
import platform from 'modules/platform';

type DispatchProps = {|
  onSignout: () => void,
|};

type Props = {| ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onSignout: (): void => {
      dispatch(platform.actions.signout());
    },
  };
};

class PureSignoutPage extends React.Component<Props> {
  componentDidMount(): void {
    const { onSignout } = this.props;
    onSignout();
  }

  render(): React.Node {
    return null;
  }
}

const SignoutPage = connect(null, mapDispatchToProps)(PureSignoutPage);

export { PureSignoutPage };
export default SignoutPage;
