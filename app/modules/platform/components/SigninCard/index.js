// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

import {
  AUTH_SIGNUP_ROUTE, AUTH_RESET_PASSWORD_ROUTE, AUTH_RESEND_CONFIRMATION_EMAIL_ROUTE,
} from 'config/routes';
import { InvalidArgumentError } from 'errors';
import EmailAndPasswordForm, { type EmailAndPasswordFormValues } from 'forms/EmailAndPasswordForm';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { ApiDimmer } = apiRequestsStatus.components;

type DispatchProps = {|
  onEmailAndPasswordFormSubmit: (values: EmailAndPasswordFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
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
      <ApiDimmer requestIds={[a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH]} />

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
          <Button as={Link} to={AUTH_RESET_PASSWORD_ROUTE}>
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

const SigninCard = connect(null, mapDispatchToProps)(translate()(PureSigninCard));

export { PureSigninCard };
export default SigninCard;
