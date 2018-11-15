// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card, Button } from 'semantic-ui-react';

import BackButton from 'components/BackButton';
import UserForm, { type UserFormValues } from 'forms/UserForm';

type PassedProps = {|
  onSignup: (email: string, name: string, password: string, tosAccepted: boolean) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureSignupCard extends React.Component<Props> {
  handleUserFormSubmit = (values: UserFormValues): void => {
    const { onSignup } = this.props;
    onSignup(values.email, values.name, values.password, values.tosAccepted);
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
            <Button.Group fluid={true} inverted={true}>

              <BackButton />
              <Button type="submit" primary={true}>
                {t('platform:signupCard.button.submit')}
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
