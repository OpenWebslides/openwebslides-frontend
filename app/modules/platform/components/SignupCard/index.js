// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import { AUTH_SIGNIN_ROUTE } from 'config/routes';
import { InvalidArgumentError } from 'errors';
import UserForm, { type UserFormValues } from 'forms/UserForm';

import actions from '../../actions';

type DispatchProps = {|
  onUserFormSubmit: (values: UserFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onUserFormSubmit: (values: UserFormValues): void => {
      if (
        values.email == null
        || values.name == null
        || values.password == null
        || values.tosAccepted == null
      ) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.signup(
        values.email,
        values.name,
        values.password,
        values.tosAccepted,
      ));
    },
  };
};

const PureSignupCard = (props: Props): React.Node => {
  const { t, onUserFormSubmit } = props;

  return (
    <Card centered={true}>
      <Card.Content>
        <Card.Header>
          {t('platform:signupCard.title')}
        </Card.Header>
        <Card.Description>
          {t('platform:signupCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <UserForm onSubmit={onUserFormSubmit}>
          <Button.Group fluid={true}>
            <Button primary={true} type="submit" icon={true} labelPosition="left">
              <Icon name="user" />
              {t('platform:signupCard.button.submit')}
            </Button>
            <Button as={Link} to={AUTH_SIGNIN_ROUTE} icon={true} labelPosition="left">
              <Icon name="lock" />
              {t('platform:signupCard.link.signin')}
            </Button>
          </Button.Group>
        </UserForm>
      </Card.Content>
    </Card>
  );
};

const SignupCard = connect(null, mapDispatchToProps)(translate()(PureSignupCard));

export { PureSignupCard };
export default SignupCard;
