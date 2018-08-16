// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { flashErrorMessage } from 'redux-flash';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { push } from 'connected-react-router';

import { type Action } from 'types/action';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';
import * as paths from 'config/routes';

type DispatchProps = {|
  signinSSO: (token: string, id: string) => void,
  flashErrorAndRedirect: (error: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    signinSSO: (token: string, id: string): void => {
      dispatch(platform.actions.signinSSO(token, id));
    },
    flashErrorAndRedirect: (error: string): void => {
      dispatch(flashErrorMessage(error));
      dispatch(push(paths.AUTH_SIGNIN_ROUTE));
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
    const { location, signinSSO, flashErrorAndRedirect } = this.props;
    const params = new URLSearchParams(location.search);

    const error = params.get('error');
    const apiToken = params.get('apiToken');
    const userId = params.get('userId');

    if (error) {
      flashErrorAndRedirect(error);
      return;
    }

    if (!apiToken) throw new InvalidArgumentError(`Invalid token`);
    if (!userId) throw new InvalidArgumentError(`Invalid id`);

    signinSSO(apiToken, userId);
  }

  render(): React.Node {
    return null; // TODO: use ApiDimmer for GET /user?
  }
}

const SSOCallbackPage = translate()(connect(null, mapDispatchToProps)(PureSSOCallbackPage));

export { PureSSOCallbackPage };
export default SSOCallbackPage;
