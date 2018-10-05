// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { flashErrorMessage } from 'redux-flash';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { push } from 'connected-react-router';

import { type ModulesAction } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';
import * as paths from 'config/routes';

type DispatchProps = {|
  setUserAuth: (token: string, id: string) => void,
  flashErrorAndRedirect: (error: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    setUserAuth: (token: string, id: string): void => {
      dispatch(platform.actions.setUserAuth(token, id));
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
    const { location, setUserAuth, flashErrorAndRedirect } = this.props;
    const params = new URLSearchParams(location.search);

    const error = params.get('error');
    const apiToken = params.get('apiToken');
    const userId = params.get('userId');

    if (error != null) {
      flashErrorAndRedirect(error);
      return;
    }

    if (apiToken == null) throw new InvalidArgumentError(`Invalid token`);
    if (userId == null) throw new InvalidArgumentError(`Invalid id`);

    setUserAuth(apiToken, userId);
  }

  // #TODO should anything be displayed here at all or is ApiDimmer sufficient?
  render(): React.Node {
    return (
      <ContainerPageWrapper>
        <p>You will be redirected soon.</p>
      </ContainerPageWrapper>
    );
  }
}

const SSOCallbackPage = translate()(connect(null, mapDispatchToProps)(PureSSOCallbackPage));

export { PureSSOCallbackPage };
export default SSOCallbackPage;
