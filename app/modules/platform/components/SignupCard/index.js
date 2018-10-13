// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

import { AUTH_SIGNIN_ROUTE } from 'config/routes';
import { InvalidArgumentError } from 'errors';
import UserForm, { type UserFormValues } from 'forms/UserForm';

type PassedProps = {|
  onCreateUser: (email: string, name: string, password: string, tosAccepted: boolean) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureSignupCard extends React.Component<Props> {
  handleUserFormSubmit = (values: UserFormValues): void => {
    const { onCreateUser } = this.props;

    if (values.email == null
      || values.name == null
      || values.password == null
      || values.tosAccepted == null
    ) {
      // Make flow happy; #TODO replace with proper redux-form validation
      throw new InvalidArgumentError(`Form data incomplete`);
    }
    onCreateUser(values.email, values.name, values.password, values.tosAccepted);
  };

  render(): React.Node {
    const { t } = this.props;

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
          <UserForm onSubmit={this.handleUserFormSubmit}>
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
  }
}

const SignupCard = withNamespaces()(PureSignupCard);

export { PureSignupCard };
export default SignupCard;
