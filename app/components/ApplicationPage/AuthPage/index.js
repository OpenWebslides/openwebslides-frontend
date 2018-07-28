// @flow

/* eslint-disable max-len */

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as paths from 'config/routes';
import platform from 'modules/platform';

import NotFoundPage from '../NotFoundPage';

import ConfirmEmailPage from './ConfirmEmailPage';
import ResendConfirmationEmailPage from './ResendConfirmationEmailPage';
import SendResetPasswordEmailPage from './SendResetPasswordEmailPage';
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';

type Props = {| |};

const { UnauthWrapper } = platform.components;

const PureAuthPage = (props: Props): React.Node => {
  return (
    <UnauthWrapper redirectIfAuthenticated={paths.HOME_ROUTE}>
      <Switch>
        <Route path={paths.AUTH_SIGNIN_ROUTE} component={SigninPage} />
        <Route path={paths.AUTH_SIGNUP_ROUTE} component={SignupPage} />
        { /* #TODO move :confirmationToken to page itself */ }
        <Route path={`${paths.AUTH_CONFIRM_EMAIL_ROUTE}/:confirmationToken`} component={ConfirmEmailPage} />
        { /* #TODO add password reset page */ }
        <Route path={paths.AUTH_RESEND_CONFIRMATION_EMAIL_ROUTE} component={ResendConfirmationEmailPage} />
        <Route path={paths.AUTH_SEND_RESET_PASSWORD_EMAIL_ROUTE} component={SendResetPasswordEmailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </UnauthWrapper>
  );
};

const AuthPage = PureAuthPage;

export { PureAuthPage };
export default AuthPage;
