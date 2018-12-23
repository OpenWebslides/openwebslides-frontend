// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button, Icon, Divider } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import {
  AUTH_SIGNUP_ROUTE,
  AUTH_SEND_RESET_PASSWORD_EMAIL_ROUTE,
  AUTH_RESEND_CONFIRMATION_EMAIL_ROUTE,
  AUTH_SSO_GOOGLE,
  AUTH_SSO_FACEBOOK,
  AUTH_SSO_UGENT,
} from 'config/routes';
import EmailAndPasswordForm, { type EmailAndPasswordFormValues } from 'forms/EmailAndPasswordForm';

import actions from '../../actions';

type DispatchProps = {|
  onEmailAndPasswordFormSubmit: (values: EmailAndPasswordFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onEmailAndPasswordFormSubmit: (values: EmailAndPasswordFormValues): void => {
      dispatch(actions.signin(values.email, values.password));
    },
  };
};

const PureSigninCard = (props: Props): React.Node => {
  const { t, onEmailAndPasswordFormSubmit } = props;

  return (
    <Card centered={true} data-test-id="signin-card">
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
          <Button.Group fluid={true} inverted={true}>
            <Button as={Link} to={AUTH_SIGNUP_ROUTE} basic={true} data-test-id="signup-button">
              {t('platform:signinCard.link.signup')}
            </Button>
            <Button type="submit" primary={true} data-test-id="submit-button">
              {t('platform:signinCard.button.submit')}
            </Button>
          </Button.Group>
        </EmailAndPasswordForm>

        <Divider horizontal={true} section={true}>Or</Divider>

        <Button.Group fluid={true} vertical={true}>
          <Button as="a" href={AUTH_SSO_GOOGLE} color="google plus">
            <Icon name="google" />
            {t('platform:signinCard.link.signinWithProvider', { provider: 'Google' })}
          </Button>
          <Button as="a" href={AUTH_SSO_FACEBOOK} color="facebook">
            <Icon name="facebook f" />
            {t('platform:signinCard.link.signinWithProvider', { provider: 'Facebook' })}
          </Button>
          <Button as="a" href={AUTH_SSO_UGENT} className="ugent">
            <Icon name="university" />
            {t('platform:signinCard.link.signinWithProvider', { provider: 'UGent CAS' })}
          </Button>
        </Button.Group>
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
    </Card>
  );
};

const SigninCard = connect(null, mapDispatchToProps)(withNamespaces()(PureSigninCard));

export { PureSigninCard };
export default SigninCard;
