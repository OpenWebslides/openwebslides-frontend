// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

import { type Action } from 'types/action';
import {
  AUTH_SIGNUP_ROUTE,
  AUTH_SEND_RESET_PASSWORD_EMAIL_ROUTE,
  AUTH_RESEND_CONFIRMATION_EMAIL_ROUTE,
  AUTH_SSO_GOOGLE,
  AUTH_SSO_FACEBOOK,
  AUTH_SSO_UGENT,
} from 'config/routes';
import { InvalidArgumentError } from 'errors';
import EmailAndPasswordForm, { type EmailAndPasswordFormValues } from 'forms/EmailAndPasswordForm';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

type DispatchProps = {|
  onEmailAndPasswordFormSubmit: (values: EmailAndPasswordFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const { ApiDimmer } = asyncRequests.components;

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    onEmailAndPasswordFormSubmit: (values: EmailAndPasswordFormValues): void => {
      if (values.email == null || values.password == null) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.signin(values.email, values.password));
    },
  };
};

const PureSigninCard = (props: Props): React.Node => {
  const { t, onEmailAndPasswordFormSubmit } = props;

  return (
    <Card centered={true}>
      <ApiDimmer ids={[a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH]} />

      <Card.Content>
        <Card.Header>
          {t('platform:signinCard.title')}
        </Card.Header>
        <Card.Description>
          {t('platform:signinCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <EmailAndPasswordForm onSubmit={onEmailAndPasswordFormSubmit}>
          <Button.Group fluid={true}>
            <Button as={Link} to={AUTH_SIGNUP_ROUTE} icon={true} labelPosition="left">
              <Icon name="user" />
              {t('platform:signinCard.link.signup')}
            </Button>
            <Button type="submit" primary={true} icon={true} labelPosition="left">
              <Icon name="lock" />
              {t('platform:signinCard.button.submit')}
            </Button>
          </Button.Group>
        </EmailAndPasswordForm>
      </Card.Content>
      <Card.Content>
        <Button.Group fluid={true} vertical={true} basic={true}>
          <Button as={Link} to={AUTH_SEND_RESET_PASSWORD_EMAIL_ROUTE}>
            {t('platform:signinCard.link.forgotPassword')}
          </Button>
          <Button as={Link} to={AUTH_RESEND_CONFIRMATION_EMAIL_ROUTE}>
            {t('platform:signinCard.link.resendConfirmationEmail')}
          </Button>
        </Button.Group>
      </Card.Content>
      <Card.Content>
        <Button.Group fluid={true} vertical={true} basic={true}>
          <Button as="a" href={AUTH_SSO_GOOGLE}>
            {t('platform:signinCard.link.signinWithProvider', { provider: 'Google' })}
          </Button>
          <Button as="a" href={AUTH_SSO_FACEBOOK}>
            {t('platform:signinCard.link.signinWithProvider', { provider: 'Facebook' })}
          </Button>
          <Button as="a" href={AUTH_SSO_UGENT}>
            {t('platform:signinCard.link.signinWithProvider', { provider: 'UGent CAS' })}
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

const SigninCard = connect(null, mapDispatchToProps)(translate()(PureSigninCard));

export { PureSigninCard };
export default SigninCard;
