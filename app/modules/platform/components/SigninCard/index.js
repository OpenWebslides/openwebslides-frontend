// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

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
    <Card fluid={true}>
      <ApiDimmer requestIds={[a.API_POST_SIGNIN_AND_GET_USER_AUTH]} />

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
            <Button primary={true} type="submit">
              {t('platform:signinCard.button.submit')}
            </Button>
            <Button secondary={true} as={Link} to="/auth/signup">
              {t('platform:signinCard.link.signup')}
            </Button>
          </Button.Group>
        </EmailAndPasswordForm>
      </Card.Content>
      <Card.Content>
        <Button secondary={true} fluid={true} as={Link} to="/auth/reset">
          {t('platform:signinCard.link.forgotPassword')}
        </Button>
        <Button secondary={true} fluid={true} as={Link} to="/auth/confirm">
          {t('platform:signinCard.link.confirmEmail')}
        </Button>
      </Card.Content>
    </Card>
  );
};

const SigninCard = connect(null, mapDispatchToProps)(translate()(PureSigninCard));

export { PureSigninCard };
export default SigninCard;
