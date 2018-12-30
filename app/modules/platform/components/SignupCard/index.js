// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card, Button } from 'semantic-ui-react';

import BackButton from 'components/BackButton';
import NewUserForm, { type NewUserFormValues } from 'forms/NewUserForm';

type PassedProps = {|
  onSignup: (email: string, name: string, password: string, tosAccepted: boolean) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureSignupCard extends React.Component<Props> {
  handleNewUserFormSubmit = (values: NewUserFormValues): void => {
    const { onSignup } = this.props;
    onSignup(values.email, values.name, values.password, values.tosAccepted);
  };

  render(): React.Node {
    const { t } = this.props;

    return (
      <Card centered={true} data-test-id="signup-card">
        <Card.Content>
          <Card.Header>
            {t('platform:signupCard.title')}
          </Card.Header>
          <Card.Description>
            {t('platform:signupCard.description')}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <NewUserForm onSubmit={this.handleNewUserFormSubmit}>
            <Button.Group fluid={true} inverted={true}>
              <BackButton />
              <Button type="submit" primary={true} data-test-id="submit-button">
                {t('platform:signupCard.button.submit')}
              </Button>
            </Button.Group>
          </NewUserForm>
        </Card.Content>
      </Card>
    );
  }
}

const SignupCard = withNamespaces()(PureSignupCard);

export { PureSignupCard };
export default SignupCard;
