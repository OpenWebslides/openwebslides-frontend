// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { flashErrorMessage } from 'redux-flash';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { push } from 'connected-react-router';

import { AUTH_SIGNIN_ROUTE, HOME_ROUTE } from 'config/routes';
import { type ModulesAction } from 'types/redux';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

type DispatchProps = {|
  ssoSigninAndRedirect: (token: string, id: string) => void,
  flashErrorAndRedirect: (error: string) => void,
|};

type Props = {| ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    ssoSigninAndRedirect: (refreshToken: string, id: string): void => {
      dispatch(platform.actions.ssoSignin(id, refreshToken));
      dispatch(push(HOME_ROUTE));
    },
    flashErrorAndRedirect: (error: string): void => {
      dispatch(flashErrorMessage(error));
      dispatch(push(AUTH_SIGNIN_ROUTE));
    },
  };
};

/**
 * SSO Callback Page - After the user successfully authenticates with an external provider,
 * the user is redirected to this page given an API token and a user ID - signalling that
 * the user should now be successfully signed in in the frontend.
 */
class PureSSOCallbackPage extends React.Component<Props> {
  componentDidMount(): void {
    const { location, ssoSigninAndRedirect, flashErrorAndRedirect } = this.props;
    const params = new URLSearchParams(location.search);

    const error = params.get('error');
    const refreshToken = params.get('refreshToken');
    const userId = params.get('userId');

    if (error != null) {
      flashErrorAndRedirect(error);
      return;
    }

    if (refreshToken == null) throw new InvalidArgumentError(`Invalid token`);
    if (userId == null) throw new InvalidArgumentError(`Invalid id`);

    ssoSigninAndRedirect(refreshToken, userId);
  }

  render(): React.Node {
    return null;
  }
}

const SSOCallbackPage = connect(null, mapDispatchToProps)(PureSSOCallbackPage);

export { PureSSOCallbackPage };
export default SSOCallbackPage;
